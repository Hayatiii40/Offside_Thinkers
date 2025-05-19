import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import {Db, MongoClient,ObjectId} from "mongodb";

const app = express();
const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://Dzhaner:12345678Dzhaner@cluster0.pa8gmws.mongodb.net/";
const client = new MongoClient(uri);
let database: Db
const api_token = "1844727b6fd7406bbcae874d539f5dc2";


app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));

app.use("/Javascript", express.static(path.join(__dirname, "../Javascript")));
app.use("/CSS", express.static(path.join(__dirname, "../CSS")));
app.use("/assets", express.static(path.join(__dirname, "../Assets")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("geconnecteerd mongo")
        database = client.db("database1")
 
    } catch (e) {
        console.error(e);
    } 
}

main();

// 🔄 Logo- en aliasgegevens
const clubLogos: { [key: string]: string } = {
  Arsenal: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  "Aston Villa": "/assets/clubs/astv.png",
  "Blackburn Rovers": "https://upload.wikimedia.org/wikipedia/en/0/0f/Blackburn_Rovers.svg",
  Bolton: "assets/clubs/bolton.png",
  Chelsea: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  Everton: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg",
  "Leeds United": "/assets/clubs/leeds.png",
  Liverpool: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  "Manchester City": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
  "Manchester United": "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  Middlesbrough: "/assets/clubs/middlesburg.png",
  "Newcastle United": "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
  "Nottingham Forest": "https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_F.C._logo.svg",
  "Queens Park Rangers": "/assets/clubs/rangers.png",
  Southampton: "assets/clubs/southampton.png",
  "Tottenham Hotspur": "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
  "West Ham": "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
  "FC Bayern Munich": "/assets/clubs/bayern.png",
  "Borussia Dortmund": "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  Ajax: "https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg",
  "Leicester City": "/assets/clubs/leicester.png",
  "FC Barcelona": "/assets/clubs/fcbarca.png",
  "Atletico Madrid":"/assets/clubs/atleticomadrid.png",
  "Besiktas JK": "/assets/clubs/besiktas.png",
  Galatasaray: "/assets/clubs/galatasaray.png",
  Fenerbahce: "/assets/clubs/fenerbahce.png",
  "FC Porto": "/assets/clubs/porto.png",
  Atalanta: "/assets/clubs/atalanta.png",
  Trabzonspor: "/assets/clubs/trabzonspor.png",
  Benfica: "/assets/clubs/benfica.png",
  "Sporting Lizbon": "/assets/clubs/sporting.png",
  "Atletic Bilbao" : "/assets/clubs/atlbil.png",
  "PSV Eindhoven" : "/assets/clubs/psveindhoven.png",
  "Real Sociedad" : "/assets/clubs/realsociedad.png",
  "Real Betis" : "/assets/clubs/realbetis.png",
  "Twente" : "/assets/clubs/twente.png",
  "S.S. Lazio" : "/assets/clubs/lazio.png",
  Fiorentina: "/assets/clubs/fiorentina.png",
  "Eintracht Frankfurt": "/assets/clubs/frankfurt.png",
  Fulham : "/assets/clubs/fulham.png",
  Brentford: "/assets/clubs/brentford.png",
  Villareal: "/assets/clubs/villareal.png",
  PAOK : "/assets/clubs/paok.png",
  "Al Nassr" : "/assets/clubs/alnassr.png",
  Mallorca : "/assets/clubs/mallorca.png",
  "Al Ittihad" : "/assets/clubs/ittihad.png",
  "S.C. Braga" : "/assets/clubs/braga.png",
  Salzburg : "/assets/clubs/leipzig.png",
  "Venezia FC" : "/assets/clubs/venezia.png",
  "Al Hilal" : "assets/clubs/alhilal.png",
  "Shaktar Donetsk" : "assets/clubs/shaktar.png",
  "Club América" : "assets/clubs/clubaamerica.png",
  "Pumas" : "assets/clubs/pumas.png",
  "El Mansura" : "assets/clubs/elmansura.png",
  "ENPPI" : "assets/clubs/enppi.png",
  "Arda Kardzhali" : "assets/clubs/arda.png",
  "Ludogorets" : "assets/clubs/ludogorets.png",
  "Levski Sofia" : "assets/clubs/levski.png",
  "CSKA Sofia" : "assets/clubs/cska.png",
  "Pirin Blagoevgrad" : "assets/clubs/pirin.png",
  "PFK Minyor Pernik" : "assets/clubs/pernik.png",
  "FK Lokomotiv Mezdra" : "assets/clubs/mezdra.png",
  "FC Kapaz" : "assets/clubs/gence.png",
  "Real Potosi" : "assets/clubs/potosi.png",
  "Barselona SC" : "assets/clubs/barselona.png",
  "Debrecen" : "assets/clubs/debrecen.png",
  "Lillestrøm" : "assets/clubs/lillestrom.png",
  "FK Haugensund" : "assets/clubs/haugesund.png",
  "JEF United" : "assets/clubs/jef.png",
  "Adana Demirspor" : "assets/clubs/adanademir.png",
  "Adanaspor" : "assets/clubs/adanaspor.png",
  "MP Antalyaspor" : "assets/clubs/antalya.png",
  "Cercle Brugge" : "assets/clubs/cercle.png",
  "Westerlo" : "assets/clubs/westerlo.png",
  "Standard Liège" : "assets/clubs/standardliege.png",
  "Sporting Charleroi" : "assets/clubs/charleroi.png",
  "FC Copenhagen" : "assets/clubs/copenhagen.png",
  "FC Inhulets Petrove" : "assets/clubs/inhulets.png",
  "Dynamo Kyiv" : "assets/clubs/kiev.png",

  // 🇩🇪 Duitsland
  "M'gladbach": "https://upload.wikimedia.org/wikipedia/commons/8/81/Borussia_M%C3%B6nchengladbach_logo.svg",
  "SC Freiburg": "/assets/clubs/freisburg.png",
  "FC Hansa Rostock": "/assets/clubs/hansarostock.png",
  "Hamburger SV": "/assets/clubs/hamburger.png",
  Kaiserslautern: "/assets/clubs/kaiser.png",
  "1. FC Köln": "/assets/clubs/koln.png",
  Leverkusen: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg",
  "1860 München": "/assets/clubs/1860munchen.png",
  "FC Schalke 04": "/assets/clubs/schalke.png",
  "VfB Stuttgart": "/assets/clubs/stuttgart.png",
  "SV Werder Bremen": "/assets/clubs/werderbremen.png",
  "FC Nurnberg" : "/assets/clubs/nurnberg.png",
  "SpVgg Greuther Fürth": "/assets/clubs/greuther.png",

  // 🇮🇹 Italië
  Inter: "/assets/clubs/inter.png",
  Juventus: "/assets/clubs/juventus.png",
  Milan: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
  "SSC Napoli": "/assets/clubs/napoli.png",
  Parma: "/assets/clubs/parma.png",
  "AS Roma": "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
  Torino: "/assets/clubs/torino.png",
  Udinese: "/assets/clubs/udinese.png",

  // 🇫🇷 Frankrijk
  "AJ Auxerre": "/assets/clubs/ajauxerre.png",
  "SC Bastia": "/assets/clubs/bastia.png",
  Bordeaux: "/assets/clubs/bordeaux.png",
  "En Avant Guingamp": "/assets/clubs/guingamp.png",
  "RC Lens": "/assets/clubs/rens.png",
  "LOSC Lille": "/assets/clubs/lille.png",
  "Olympic Lyon": "/assets/clubs/lyon.png",
  "FC Martigues": "/assets/clubs/martigues.png",
  "FC Metz": "/assets/clubs/metz.png",
  "AS Monaco": "/assets/clubs/monaco.png",
  Montpellier: "/assets/clubs/montpellier.png",
  "FC Nantes": "/assets/clubs/nantes.png",
  "OGC Nice": "/assets/clubs/nice.png",
  "Paris SG": "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
  "Stade Rennais FC": "/assets/clubs/rennais.png",
  Strasbourg: "/assets/clubs/strasbourg.png",

  // 🇺🇸 VS
  "Washington Spirit": "/assets/clubs/washington.png",

  // 🇬🇧 Schotland
  Aberdeen: "/assets/clubs/aberdeen.png",
  Celtic: "/assets/clubs/celtic.png",
  Hearts: "/assets/clubs/hearts.png",
  Hibernian: "/assets/clubs/hibernian.png",
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


// interface Club {
//   id: number;
//   name: string;
//   league: number | null;
// }

interface ClubsResponse {
  pagination: any;
  items: Club[];
}

export interface Club {
  _id?: ObjectId;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}
export interface League {
  _id?: ObjectId;
  id: number;
  area: {
    name: string;
    code: string;
  };
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
  currentSeason: any;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
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

app.get("/skysoccer", (req,res)=>{
  res.render("Jumpgame",{title:"SkySoccer"})
})


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