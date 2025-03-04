import { In } from "typeorm";
import { AppDataSource } from "../config/database";
import { Contestant } from "../entity/Contestant";
import { TierEntry } from "../entity/TierEntry";

const contestants2025 = [
  {
    year: 2025,
    country: "Albania",
    artist: "Shkodra Elektronike",
    songTitle: "Zjerm",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2024-12/shkodra-elektronike.jpg?itok=kMfDRtVy",
    songUrl: "https://www.youtube.com/watch?v=RNT1SmmxuIk",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Armenia",
    artist: "PARG",
    songTitle: "SURVIVOR",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/pargarmenia25.jpeg?h=24514a47&itok=eICrXr4Q",
    songUrl: "https://www.youtube.com/watch?v=RfH5o3XtI2c",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Australia",
    artist: "Go-Jo",
    songTitle: "Milkshake Man",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/Photo-Credit-Jason-Henley.jpg?h=6587cc3f&itok=31qPPghV",
    songUrl: "https://www.youtube.com/watch?v=_08I6mjHSLA",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Austria",
    artist: "JJ",
    songTitle: "Wasted Love",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-01/ESC25_AUT_JJ_23 Crop.jpg?h=1001d0e9&itok=BSgIdCJE",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Azerbaijan",
    artist: "Mamagama",
    songTitle: "Run With U",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/Mamagama-1.jpg?h=70afb95b&itok=IzV6eaNO",
    songUrl: "https://www.youtube.com/watch?v=upbiPJ9uA70",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Belgium",
    artist: "Red Sebastian",
    songTitle: "Strobe Lights",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-01/RED%20SEBASTIAN.jpg?h=8928d1dd&itok=5jn96FgX",
    songUrl: "https://www.youtube.com/watch?v=oVrsnGFmuss",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Croatia",
    artist: "Marko Bošnjak",
    songTitle: "Poison Cake",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-03/marko1.jpg?h=be5c9165&itok=5b6jwNmG",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Cyprus",
    artist: "Theo Evan",
    songTitle: "",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2024-09/image00026.jpg?h=70bc6f1e&itok=UudJXUNc",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Czechia",
    artist: "ADONXS",
    songTitle: "Kiss Kiss Goodbye",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2024-12/ADONXS_DAVID_URBAN_01.jpg?h=ec626e92&itok=5YzrcFEW",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Denmark",
    artist: "Sissal",
    songTitle: "Hallucination",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/Sissal-Anne-Sofie-Pathuel.png?itok=PFQEzrO0",
    songUrl: "https://www.youtube.com/watch?v=gdCAgiSIOUc",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Estonia",
    artist: "Tommy Cash",
    songTitle: "Espresso Macchiato",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/Eesti-Laul-2025-Tommy-Cash-photo-Ken-Murk.jpg?h=b3e00d9c&itok=FVS0mgXH",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Finland",
    artist: "Erika Vikman",
    songTitle: "Ich Komme",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/Erika_Vikman_no_graphic_highres_Credit_NelliKentta.jpg?itok=IDM7Uvza",
    songUrl: "https://www.youtube.com/watch?v=Kg3QoTpnqyw",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "France",
    artist: "Louane",
    songTitle: "",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/PHOTOEUROVISION%20sans%20logo.png?h=50a84732&itok=Bb9FJvzj",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: false,
    inGrandFinal: true,
  },
  {
    year: 2025,
    country: "Georgia",
    artist: "",
    songTitle: "",
    imageUrl: "",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Germany",
    artist: "Abor & Tynna",
    songTitle: "Baller",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-03/23_10_11-C-LINHNGUYEN_Abor-Tynna_019.jpg?h=fe3f4cff&itok=QBDc1vb1",
    songUrl: "https://www.youtube.com/watch?v=6BfRACNvdBQ",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: false,
    inGrandFinal: true,
  },
  {
    year: 2025,
    country: "Greece",
    artist: "Klavdia",
    songTitle: "Asteromáta",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-01/klavdia.jpg?h=e281872f&itok=LoWjdjdP",
    songUrl: "https://www.youtube.com/watch?v=UxzeTezgey4",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Iceland",
    artist: "VÆB",
    songTitle: "RÓA",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-01/VAEB.jpg?h=c681f704&itok=CIIuHWjj",
    songUrl: "https://www.youtube.com/watch?v=LZE1WzOwtQQ",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Ireland",
    artist: "EMMY",
    songTitle: "Laika Party",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-01/3ec2ec22-5f0f-7d67-3d0b-1ea85b42f3b7.jpg?h=e7b32015&itok=hfvwahov",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Israel",
    artist: "Yuval Raphael",
    songTitle: "",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-01/Yuval-Raphael-KAN.jpg?h=983fe789&itok=CIyjnlmx",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Italy",
    artist: "Lucio Corsi",
    songTitle: "Volevo Essere Un Duro",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/luciocorsi25.jpg?h=93039eed&itok=FhQHg-HG",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: false,
    inGrandFinal: true,
  },
  {
    year: 2025,
    country: "Latvia",
    artist: "Tautumeitas",
    songTitle: "Bur man laimi",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/Tautumeitas.jpg?h=b42134f8&itok=qQnjucC9",
    songUrl: "https://www.youtube.com/watch?v=b1_t79mQkm4",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Lithuania",
    artist: "Katarsis",
    songTitle: "Tavo Akys",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/KATARSIS3.jpg?h=95a2f6ff&itok=FCfAR8Qz",
    songUrl: "https://www.youtube.com/watch?v=R2f2aZ6Fy58",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Luxembourg",
    artist: "Laura Thorn",
    songTitle: "La Poupée Monte Le Son",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-01/laura_thorn.jpg?h=57e055fd&itok=KymzONi7",
    songUrl: "https://www.youtube.com/watch?v=LVHu_KwHiKY",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Malta",
    artist: "Miriana Conte",
    songTitle: "Kant ('Singing')",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/Miriana-Conte.jpg?itok=vmURgcg0",
    songUrl: "https://www.youtube.com/watch?v=8qNK1tt6L5k",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Montenegro",
    artist: "Nina Žižić",
    songTitle: "Dobrodošli",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2024-12/Nina%20Z%CC%8Ciz%CC%8Cic%CC%81%2C%20photo%20Nada%20Vojinovic%CC%81.jpeg?h=90a7e1a4&itok=SC5MX2ZU",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Netherlands",
    artist: "Claude",
    songTitle: "C'est La Vie",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2024-12/Claude-1-photo-credits-Kim-de-Hoop.jpg?h=b6801995&itok=AtlamXg8",
    songUrl: "https://www.youtube.com/watch?v=hEHwr5k9pd0",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Norway",
    artist: "Kyle Alessandro",
    songTitle: "Lighter",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-01/Kyle-Alessandro.jpg?itok=Y8jpQRu0",
    songUrl: "https://www.youtube.com/watch?v=h7jkEmoBvU0",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Poland",
    artist: "Justyna Steczkowska",
    songTitle: "GAJA",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/Justyna-Steczkowska-dzis-po-20-00-w-Radiu-ZET-Tylko-u-nas-premiera-eurowizyjnej.jpg?itok=DSCkXSbF",
    songUrl: "https://www.youtube.com/watch?v=YXHHDjiclxA",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Portugal",
    artist: "",
    songTitle: "",
    imageUrl: "",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "San Marino",
    artist: "",
    songTitle: "",
    imageUrl: "",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Serbia",
    artist: "Princ",
    songTitle: "Mila",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/3-Princ-photo-RTS-Gordan-Jovic.jpg?h=e021b203&itok=GZ_ccw1x",
    songUrl: "https://www.youtube.com/watch?v=FsCBHvjQznw",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: true,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Slovenia",
    artist: "Klemen",
    songTitle: "How Much Time Do We Have Left",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/Klemen_Foto%20Personal%20Collection.jpg?h=bdde7662&itok=gT0bRoj_",
    songUrl: "https://www.youtube.com/watch?v=qTS2L0VcaVI",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Spain",
    artist: "Melody",
    songTitle: "Esa Diva",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/melody_rtve.jpeg?itok=x8w0oCp0",
    songUrl: "https://www.youtube.com/watch?v=H46FB-rLh04",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: false,
    inGrandFinal: true,
  },
  {
    year: 2025,
    country: "Sweden",
    artist: "",
    songTitle: "",
    imageUrl: "",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "Switzerland",
    artist: "",
    songTitle: "",
    imageUrl: "",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: false,
    inGrandFinal: true,
  },
  {
    year: 2025,
    country: "Ukraine",
    artist: "Ziferblat",
    songTitle: "Bird of Pray",
    imageUrl: "https://eurovision.tv/sites/default/files/styles/teaser/public/media/image/2025-02/Ziferblat.jpg?h=dc556db0&itok=kkqtw6X2",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: true,
    inSecondSemiFinal: false,
    inGrandFinal: false,
  },
  {
    year: 2025,
    country: "United Kingdom",
    artist: "",
    songTitle: "",
    imageUrl: "",
    songUrl: "",
    lyrics: `Lyrics currently unavailable`,
    inFirstSemiFinal: false,
    inSecondSemiFinal: false,
    inGrandFinal: true,
  },
];

const seedDatabase = async () => {
  try {
    // Initialize the database connection
    await AppDataSource.initialize();
    console.log("Database connection established");
    
    const contestantRepository = AppDataSource.getRepository(Contestant);
    const tierEntryRepository = AppDataSource.getRepository(TierEntry);
    
    // Check if we already have contestants for 2025
    const existingCount = await contestantRepository.count({ where: { year: 2025 } });
    
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing contestants for 2025. Removing them first...`);
      
      // Get all 2025 contestants
      const contestantsToDelete = await contestantRepository.find({ where: { year: 2025 } });
      const contestantIds = contestantsToDelete.map(c => c.id);
      
      // First delete any tier entries referencing these contestants
      console.log("Removing related tier entries...");
      await tierEntryRepository.delete({ contestant: { id: In(contestantIds) } });
      
      // Now it's safe to delete the contestants
      await contestantRepository.delete({ year: 2025 });
    }
    
    // Insert contestants
    const contestantEntities = contestantRepository.create(contestants2025);
    await contestantRepository.save(contestantEntities);
    
    console.log(`Successfully seeded ${contestants2025.length} contestants for Eurovision 2025`);
    
    // Close the connection
    await AppDataSource.destroy();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();