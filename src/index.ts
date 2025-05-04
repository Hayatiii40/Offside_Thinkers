import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/Javascript", express.static(path.join(__dirname, "../Javascript")));
app.use("/CSS", express.static(path.join(__dirname, "../CSS")));
app.use("/Assets", express.static(path.join(__dirname, "../Assets")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔄 Logo- en aliasgegevens
const clubLogos: { [key: string]: string } = {
  Arsenal: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  "Aston Villa": "https://upload.wikimedia.org/wikipedia/en/9/9f/Aston_Villa_logo.svg",
  "Blackburn Rovers": "https://upload.wikimedia.org/wikipedia/en/0/0f/Blackburn_Rovers.svg",
  Bolton: "https://upload.wikimedia.org/wikipedia/en/6/68/Bolton_Wanderers_F.C._logo.svg",
  Chelsea: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  Everton: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg",
  "Leeds United": "https://upload.wikimedia.org/wikipedia/en/0/0c/Leeds_United_Logo.svg",
  Liverpool: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  "Manchester City": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
  "Manchester United": "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  Middlesbrough: "https://upload.wikimedia.org/wikipedia/en/3/3c/Middlesbrough_FC_crest.svg",
  "Newcastle United": "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
  "Nottingham Forest": "https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_F.C._logo.svg",
  "Queens Park Rangers": "https://upload.wikimedia.org/wikipedia/en/e/e2/Queens_Park_Rangers_crest.svg",
  Southampton: "assets/clubs/southampton.png",
  "Tottenham Hotspur": "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
  "West Ham": "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
  "FC Bayern Munich": "/assets/clubs/bayern.png",
  "Borussia Dortmund": "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  Ajax: "https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg",
  "Leicester City": "/assets/clubs/leicester.png",
  "FC Barcelona": "/assets/clubs/fcbarca.png",

  // 🇩🇪 Duitsland
  "M'gladbach": "https://upload.wikimedia.org/wikipedia/commons/8/81/Borussia_M%C3%B6nchengladbach_logo.svg",
  "SC Freiburg": "https://upload.wikimedia.org/wikipedia/en/f/f1/SC_Freiburg_Logo.svg",
  "FC Hansa Rostock": "https://upload.wikimedia.org/wikipedia/en/8/84/F.C._Hansa_Rostock_logo.svg",
  "Hamburger SV": "https://upload.wikimedia.org/wikipedia/en/6/65/Hamburger_sport_verein_logo.svg",
  Kaiserslautern: "https://upload.wikimedia.org/wikipedia/commons/0/05/1._FC_Kaiserslautern_Logo.svg",
  "1. FC Köln": "https://upload.wikimedia.org/wikipedia/en/8/89/FC_Cologne_logo.svg",
  Leverkusen: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg",
  "1860 München": "https://upload.wikimedia.org/wikipedia/en/f/fb/TSV_1860_Munich_logo.svg",
  "FC Schalke 04": "https://upload.wikimedia.org/wikipedia/en/6/6d/FC_Schalke_04_logo.svg",
  "VfB Stuttgart": "https://upload.wikimedia.org/wikipedia/en/1/13/VfB_Stuttgart_1893_Logo.svg",
  "SV Werder Bremen": "https://upload.wikimedia.org/wikipedia/en/b/be/SV-Werder-Bremen-Logo.svg",

  // 🇮🇹 Italië
  Inter: "https://upload.wikimedia.org/wikipedia/en/0/05/Inter_Milan.svg",
  Juventus: "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
  Milan: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
  "SSC Napoli": "https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli.svg",
  Parma: "https://upload.wikimedia.org/wikipedia/en/e/e4/Parma_Calcio_1913_logo.svg",
  "AS Roma": "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
  Torino: "https://upload.wikimedia.org/wikipedia/en/2/2c/Torino_FC_Logo.svg",
  Udinese: "https://upload.wikimedia.org/wikipedia/en/2/2e/Udinese_Calcio_logo.svg",

  // 🇫🇷 Frankrijk
  "AJ Auxerre": "https://upload.wikimedia.org/wikipedia/en/e/e4/AJ_Auxerre_logo.svg",
  "SC Bastia": "https://upload.wikimedia.org/wikipedia/en/e/e9/SC_Bastia.svg",
  Bordeaux: "https://upload.wikimedia.org/wikipedia/en/f/f0/Logo_FC_Girondins_de_Bordeaux_2020.svg",
  "En Avant Guingamp": "https://upload.wikimedia.org/wikipedia/en/8/86/En_Avant_de_Guingamp_logo.svg",
  "RC Lens": "https://upload.wikimedia.org/wikipedia/en/6/64/RC_Lens_logo.svg",
  "LOSC Lille": "https://upload.wikimedia.org/wikipedia/en/5/5e/LOSC_Lille.svg",
  OL: "https://upload.wikimedia.org/wikipedia/en/c/c6/Olympique_Lyonnais.svg",
  "FC Martigues": "https://upload.wikimedia.org/wikipedia/en/1/1d/FC_Martigues_logo.svg",
  "FC Metz": "https://upload.wikimedia.org/wikipedia/en/d/d6/FC_Metz_2017_logo.svg",
  "AS Monaco": "https://upload.wikimedia.org/wikipedia/en/b/b2/AS_Monaco_FC_Logo.svg",
  Montpellier: "https://upload.wikimedia.org/wikipedia/en/f/f0/Montpellier_HSC_logo.svg",
  "FC Nantes": "https://upload.wikimedia.org/wikipedia/en/9/9d/FC_Nantes_logo_2022.svg",
  "OGC Nice": "https://upload.wikimedia.org/wikipedia/en/a/a8/OGC_Nice_logo.svg",
  "Paris SG": "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
  "Stade Rennais FC": "https://upload.wikimedia.org/wikipedia/en/5/55/Stade_Rennais_F.C..svg",
  Strasbourg: "https://upload.wikimedia.org/wikipedia/en/0/04/Racing_Club_de_Strasbourg_Alsace_2012_logo.svg",

  // 🇺🇸 VS
  "Washington Spirit": "https://upload.wikimedia.org/wikipedia/en/8/84/Washington_Spirit_logo_2021.svg",

  // 🇬🇧 Schotland
  Aberdeen: "https://upload.wikimedia.org/wikipedia/en/3/36/Aberdeen_FC_logo.svg",
  Celtic: "https://upload.wikimedia.org/wikipedia/en/6/65/Celtic_FC.svg",
  Hearts: "https://upload.wikimedia.org/wikipedia/en/6/63/Heart_of_Midlothian_FC_logo.svg",
  Hibernian: "https://upload.wikimedia.org/wikipedia/en/5/5e/Hibernian_FC_badge.svg",
};


const aliases: { [key: string]: string } = {
  // Engelse clubs
  "Man Utd": "Manchester United",
  "Manchester Utd": "Manchester United",
  "Man United": "Manchester United",
  "Man City": "Manchester City",
  "Manchester City FC": "Manchester City",
  "Newcastle Utd": "Newcastle United",
  "Nott'm Forest": "Nottingham Forest",
  "Nott Forest": "Nottingham Forest",
  "QPR": "Queens Park Rangers",
  "Spurs": "Tottenham Hotspur",
  "Tottenham": "Tottenham Hotspur",
  "Wolves": "Wolverhampton Wanderers",
  "West Ham": "West Ham United",
  "Brighton": "Brighton & Hove Albion",
  "Sheff Utd": "Sheffield United",
  "Leeds": "Leeds United",
  "Leicester": "Leicester City",
  "Preston": "Preston North End",
  "Birmingham": "Birmingham City",
  "Cardiff": "Cardiff City",
  "Swansea": "Swansea City",
  "Stoke": "Stoke City",
  "Bristol City FC": "Bristol City",

  // Duitse clubs
  "FC Bayern München": "FC Bayern Munich",
  "Bayern München": "FC Bayern Munich",
  "Bayern Munich": "FC Bayern Munich",
  "Borussia Mönchengladbach": "M'gladbach",
  "Mönchengladbach": "M'gladbach",
  "Leverkusen": "Bayer Leverkusen",
  "RB Leipzig": "RasenBallsport Leipzig",
  "Schalke": "Schalke 04",

  // Franse clubs
  "Paris Saint-Germain": "Paris SG",
  "PSG": "Paris SG",
  "Olympique Lyon": "Lyon",
  "OL": "Lyon",
  "Olympique Marseille": "Marseille",
  "AS Monaco": "Monaco",
  "OGC Nice": "Nice",

  // Spaanse clubs
  
  "Atlético": "Atlético Madrid",
  "Athletic": "Athletic Bilbao",
  "Real Betis Balompié": "Real Betis",

  // Italiaanse clubs
  "Internazionale": "Inter Milan",
  "Inter": "Inter Milan",
  "Napoli": "SSC Napoli",
  "AS Roma": "Roma",
  "Juventus FC": "Juventus",

  // Nederlandse clubs
  "PSV Eindhoven": "PSV",
  "AFC Ajax": "Ajax",
  "Feyenoord Rotterdam": "Feyenoord",
};


interface Club {
  id: number;
  name: string;
  league: number | null;
}

interface ClubsResponse {
  pagination: any;
  items: Club[];
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getShuffledOptions(correct: string, allNames: string[]): string[] {
  const options = new Set<string>();
  options.add(correct);
  while (options.size < 4) {
    const randomName = allNames[getRandomInt(allNames.length)];
    if (randomName !== correct) options.add(randomName);
  }
  return Array.from(options).sort(() => 0.5 - Math.random());
}


// 🆕 Functie om meerdere pagina’s op te halen
async function fetchAllClubPages(pages: number): Promise<Club[]> {
  const headers = {
    Accept: "application/json",
    "X-AUTH-TOKEN": "8ba2f493-4588-5f0d-99a2-a7a67d2c6ae6",
  };

  const allClubs: Club[] = [];

  for (let page = 1; page <= pages; page++) {
    const response = await fetch("https://api.futdatabase.com/api/clubs?page=${page}, { headers }");
    if (!response.ok) {
      throw new Error("API-fout op pagina ${page}: ${response.status}");
    }

    const data = (await response.json()) as ClubsResponse;
    allClubs.push(...data.items);
  }
  console.log(allClubs)
  return allClubs;
}


// Voorbeeldlijst van teamnamen die je gebruikt in je quiz (of haal uit API)
const allTeams: string[] = [
  "Manchester Utd",
  "Real Madrid",
  "PSG",
  "FC Bayern München",
  "Spurs",
  "QPR",
  "Ajax",
  "Borussia Mönchengladbach",
  "Newcastle Utd",
  "Nottingham Forest",
  "Leicester City",
  "Unknown Team" // test
];

const missingLogos: string[] = [];

for (const team of allTeams) {
  const actualName = aliases[team] || team;
  const logo = clubLogos[actualName];

  if (!logo) {
    missingLogos.push(`${team} → ${actualName}`);
  }
}

if (missingLogos.length === 0) {
  console.log("✅ Alle teamnamen hebben een bijbehorend logo.");
} else {
  console.log("❌ De volgende teams hebben geen matchend logo:");
  for (const team of missingLogos) {
    console.log(" -", team);
  }
}
import axios from "axios";


async function checkLogos() {
  const broken: string[] = [];

  for (const [team, url] of Object.entries(clubLogos)) {
    try {
      const response = await axios.head(url); // alleen headers
      if (response.status !== 200) {
        console.log(`❌ ${team} → ${url} [status: ${response.status}]`);
        broken.push(team);
      } else {
        console.log(`✅ ${team}`);
      }
    } catch (error) {
      console.log(`❌ ${team} → ${url} [GEEN toegang]`);
      broken.push(team);
    }
  }

  console.log("\nKAPOTTE LOGO'S:");
  console.log(broken.length ? broken.join(", ") : "Alles werkt 🎉");
}

checkLogos();

// ✅ ROUTES
app.get("/", (req, res) => {
  res.render("Landingspage", { title: "Welcome to Glory" });
});

app.get("/inlog", (req, res) => {
  res.render("InlogPagina", { title: "Inloggen" });
});

app.get("/registratie", (req, res) => {
  res.render("RegistratiePage", { title: "Registratie" });
});

app.get("/menu", (req, res) => {
  res.render("Menupagina", { title: "Menu" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    res.redirect("/menu");
  } else {
    res.redirect("/inlog");
  }
});

app.get("/veelgesteldevragen", (req, res) => {
  res.render("Veelgesteldevragen", { title: "Veelgestelde Vragen" });
});

app.get("/soccersky", (req, res) => {
  res.render("JumpGame", { title: "Soccer Sky" });
});

// ✅ QUIZ pagina
app.get("/quiz", async (req: Request, res: Response) => {
  try {
    // const allClubs = await fetchAllClubPages(3); // Haal pagina 1 t/m 3 op

    const allClubs = Object.keys(clubLogos);

    const correctAnswer = allClubs[getRandomInt(allClubs.length)];
    const logoUrl = clubLogos[correctAnswer];
  
    const options = getShuffledOptions(correctAnswer, allClubs);
  
    res.render("quizpage", {
      logoUrl,
      correctAnswer,
      options,
    });
  } catch (error) {
    console.error("Fout bij ophalen clubs:", error);
    res.status(500).send("Er ging iets mis bij het laden van de quiz.");
  }
});

// ✅ API endpoint (JSON)
app.get("/api/quiz", async (req: Request, res: Response) => {
  try {
    const allClubs = Object.keys(clubLogos);

    const correctAnswer = allClubs[getRandomInt(allClubs.length)];
    const logoUrl = clubLogos[correctAnswer];
  
    const options = getShuffledOptions(correctAnswer, allClubs);
  
    res.json({
      logoUrl,
      correctAnswer,
      options,
    });
  
  } catch (error) {
    console.error("Fout bij ophalen clubs:", error);
    res.status(500).json({ error: "Er ging iets mis bij het laden van de quiz." });
  }
});

// app.get("/api/quiz", async (req: Request, res: Response) => {
//   try {
//     const allClubNames = Object.keys(clubLogos);
//     const correctName = allClubNames[getRandomInt(allClubNames.length)];
//     const options = getShuffledOptions(correctName, allClubNames);

//     res.json({
//       logoUrl: clubLogos[correctName],
//       correctAnswer: correctName,
//       options,
//     });
//   } catch (error) {
//     console.error("Fout bij quiz genereren:", error);
//     res.status(500).json({ error: "Er ging iets mis bij het laden van de quiz." });
//   }
// });

// ✅ Start server
app.listen(PORT, () => {
  console.log("✅ Server draait op http://localhost:${PORT}");
});