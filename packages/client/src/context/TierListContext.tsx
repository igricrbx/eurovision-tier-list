import React, { createContext, useContext, useState, useEffect } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { contestantService, tierListService } from '../services/api';
import { Contestant, TierEntry, TierData, Stage } from '../types';

// Tiers and stage config can be moved to constants file later if needed
const TIERS = ['A', 'B', 'C', 'D', 'E', 'F'];

interface TierListContextType {
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  tierData: TierData;
  contestants: Contestant[];
  tierListName: string;
  setTierListName: (name: string) => void;
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
  stage: Stage;
  setStage: (stage: Stage) => void;
  saveDialogOpen: boolean;
  setSaveDialogOpen: (open: boolean) => void;
  saveSuccess: boolean;
  setSaveSuccess: (success: boolean) => void;
  shareCode: string;
  setShareCode: (code: string) => void;
  handleDragEnd: (result: DropResult) => void;
  handleStageChange: (stage: Stage) => Promise<void>;
  handleSave: () => Promise<void>;
  TIERS: string[];
}

const TierListContext = createContext<TierListContextType | undefined>(undefined);

export const useTierList = () => {
  const context = useContext(TierListContext);
  if (!context) {
    throw new Error('useTierList must be used within a TierListProvider');
  }
  return context;
};

interface TierListProviderProps {
  children: React.ReactNode;
  listId?: string;
}

export const TierListProvider: React.FC<TierListProviderProps> = ({ children, listId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tierData, setTierData] = useState<TierData>({});
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [tierListName, setTierListName] = useState('My Eurovision 2025 Tier List');
  const [isPublic, setIsPublic] = useState(true);
  const [stage, setStage] = useState<Stage>(Stage.GRAND_FINAL);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [shareCode, setShareCode] = useState('');
  
  const { state } = useAuth();
  const navigate = useNavigate();
  
  // Load contestants based on selected stage
  const loadContestants = async (selectedStage: Stage) => {
    try {
      setLoading(true);
      const contestantsData = await contestantService.getAllContestants(2025, selectedStage);
      setContestants(contestantsData);
      
      // Initialize tier data with contestants in the pool
      const initialTierData: TierData = {};
      
      // Initialize tiers
      TIERS.forEach(tier => {
        initialTierData[tier] = [];
      });
      
      // Add "pool" for unassigned contestants
      initialTierData.pool = contestantsData.map((contestant, index) => ({
        tier: 'pool',
        order: index, // Set initial order based on index
        contestant
      }));
      
      setTierData(initialTierData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load contestants. Please try again.');
      console.error(err);
      setLoading(false);
    }
  };
  
  // Load existing tier list data
  const loadTierList = async (id: string) => {
    try {
      setLoading(true);
      const tierList = await tierListService.getTierList(id);
      
      if (tierList) {
        setTierListName(tierList.name);
        setIsPublic(tierList.isPublic);
        setStage(tierList.stage);
        
        // Load contestants for this stage
        const contestantsData = await contestantService.getAllContestants(2025, tierList.stage);
        setContestants(contestantsData);
        
        // Initialize tier data
        const initialTierData: TierData = {};
        
        // Initialize tiers
        TIERS.forEach(tier => {
          initialTierData[tier] = [];
        });
        
        // Map entries to their tiers
        const loadedTierData = { ...initialTierData };
        loadedTierData.pool = [];
        
        // Create a map of contestant IDs to track which ones are already assigned
        const assignedContestants = new Set();
        
        // Assign contestants to tiers based on the loaded tier list
        tierList.entries.forEach((entry: TierEntry) => {
          if (!loadedTierData[entry.tier]) {
            loadedTierData[entry.tier] = [];
          }
          
          loadedTierData[entry.tier].push(entry);
          assignedContestants.add(entry.contestant.id);
        });
        
        // Add remaining contestants to the pool
        contestantsData.forEach(contestant => {
          if (!assignedContestants.has(contestant.id)) {
            loadedTierData.pool.push({
              tier: 'pool',
              contestant,
              order: loadedTierData.pool.length // Use the current length as order
            });
          }
        });
        
        setTierData(loadedTierData);
      }
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial data load
  useEffect(() => {
    const initData = async () => {
      if (listId) {
        await loadTierList(listId);
      } else {
        await loadContestants(stage);
      }
    };
    
    initData();
  }, [listId]);
  
  // Handle stage change
  const handleStageChange = async (newStage: Stage) => {
    if (stage !== newStage) {
      setStage(newStage);
      await loadContestants(newStage);
    }
  };
  
  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    // Dropped outside the list
    if (!destination) {
      return;
    }
    
    // If the source and destination are the same, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    
    // Create a copy of the tier data
    const newTierData = { ...tierData };
    
    // Remove from source
    const [movedItem] = newTierData[source.droppableId].splice(source.index, 1);
    
    // Update tier property if tier has changed
    if (source.droppableId !== destination.droppableId) {
      movedItem.tier = destination.droppableId;
    }
    
    // Add to destination
    newTierData[destination.droppableId].splice(destination.index, 0, movedItem);
    
    // Update order values for each entry in the affected tiers
    if (source.droppableId !== destination.droppableId) {
      // Update order for both source and destination tiers
      newTierData[source.droppableId] = newTierData[source.droppableId].map((entry, index) => ({
        ...entry,
        order: index
      }));
      
      newTierData[destination.droppableId] = newTierData[destination.droppableId].map((entry, index) => ({
        ...entry,
        order: index
      }));
    } else {
      // Update order for just the one tier that changed
      newTierData[source.droppableId] = newTierData[source.droppableId].map((entry, index) => ({
        ...entry,
        order: index
      }));
    }
    
    // Update state
    setTierData(newTierData);
  };
  
  // Handle save
  const handleSave = async () => {
    if (!state.isAuthenticated) {
      setError('You must be logged in to save a tier list');
      return;
    }
    
    try {
      setLoading(true);
      
      // Collect all entries except those in the pool
      const entries: any[] = [];
      Object.entries(tierData).forEach(([tier, tierEntries]) => {
        if (tier !== 'pool') {
          tierEntries.forEach(entry => {
            entries.push({
              tier,
              contestantId: entry.contestant.id
            });
          });
        }
      });
      
      let responseData;
      let tierListId;
      
      if (listId) {
        // Update existing tier list
        console.log('Updating existing tier list with ID:', listId);
        try {
          responseData = await tierListService.updateTierList(listId, {
            name: tierListName,
            isPublic,
            stage,
            entries
          });
          console.log('Update response full object:', responseData);
          tierListId = listId;
          
        } catch (err) {
          console.error('Error updating tier list:', err);
          setError(`Failed to update tier list: ${err.message || 'Unknown error'}`);
          setLoading(false);
          return;
        }
      } else {
        // Create new tier list with stage
        console.log('Creating new tier list');
        try {
          responseData = await tierListService.createTierList(tierListName, isPublic, stage);
          console.log('Create response full object:', responseData);
          
          if (responseData && responseData.id) {
            tierListId = responseData.id;
            console.log('Created tier list with ID:', tierListId);
            
            // Then update it with entries
            try {
              const updatedData = await tierListService.updateTierList(tierListId, { entries });
              console.log('Update entries response full object:', updatedData);
              responseData = updatedData;

            } catch (updateErr) {
              console.error('Error updating entries for new tier list:', updateErr);
              setError(`Failed to add entries to your tier list: ${updateErr.message || 'Unknown error'}`);
              // Continue anyway since the tier list was created
            }
          }
        } catch (err) {
          console.error('Error creating tier list:', err);
          setError(`Failed to create tier list: ${err.message || 'Unknown error'}`);
          setLoading(false);
          return;
        }
      }

      const newTierlist = await tierListService.getTierList(tierListId);

      setShareCode(newTierlist.shareCode);
          
      setSaveSuccess(true);
      setSaveDialogOpen(true);
    } catch (err) {
      console.error('Error saving tier list:', err);
      setError(`Failed to save tier list: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    loading,
    error,
    setError,
    tierData,
    contestants,
    tierListName,
    setTierListName,
    isPublic,
    setIsPublic,
    stage,
    setStage,
    saveDialogOpen,
    setSaveDialogOpen,
    saveSuccess,
    setSaveSuccess,
    shareCode,
    setShareCode,
    handleDragEnd,
    handleStageChange,
    handleSave,
    TIERS
  };
  
  return (
    <TierListContext.Provider value={contextValue}>
      {children}
    </TierListContext.Provider>
  );
};
