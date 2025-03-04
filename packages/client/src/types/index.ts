export enum Stage {
  FIRST_SEMI = "FIRST_SEMI",
  SECOND_SEMI = "SECOND_SEMI",
  GRAND_FINAL = "GRAND_FINAL"
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Contestant {
  id: string;
  country: string;
  artist: string;
  songTitle: string;
  imageUrl?: string;
  songUrl?: string;
  lyrics?: string;
  year: number;
  inFirstSemiFinal: boolean;
  inSecondSemiFinal: boolean;
  inGrandFinal: boolean;
}

export interface TierEntry {
  id?: string;
  tier: string;
  order: number; // Add or ensure this field exists
  contestant: Contestant;
  contestantId?: string;
}

export interface TierList {
  id: string;
  name: string;
  isPublic: boolean;
  shareCode: string;
  entries: TierEntry[];
  createdAt: string;
  updatedAt: string;
  user?: User;
  description?: string;
  stage: Stage;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface TierData {
  [key: string]: TierEntry[];
}