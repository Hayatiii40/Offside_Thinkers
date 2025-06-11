import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import bcrypt from "bcrypt";
import session from 'express-session';
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
app.use(session({
  secret: 'supergeheimeWPLsessie',
  resave: false,
  saveUninitialized: false,
}));



async function main() {
  try {
    if(await client.connect())    
    console.log("✅ Verbonden met MongoDB");
    database = client.db("database1");

    app.post("/registratie", async (req: Request, res: Response) => {
      const { username, password, ["confirm-password"]: confirmPassword } = req.body;

      if (!username || !password || !confirmPassword) {
        return res.status(400).render("RegistratiePage", {
          title: "Registratie",
          error: "Vul alle velden in."
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).render("RegistratiePage", {
          title: "Registratie",
          error: "Wachtwoorden komen niet overeen."
        });
      }

      try {
        const usersCollection = database.collection<User>("users");
        const existingUser = await usersCollection.findOne({ username });

        if (existingUser) {
          return res.status(400).render("RegistratiePage", {
            title: "Registratie",
            error: "Gebruikersnaam is al bezet."
          });
         }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser: User = {
  username,
  password: hashedPassword,
  role: "USER",
  createdAt: new Date(),
  favourites: [],
  favouriteLeague: undefined,
  blacklistedClubs: [],
  highscore1: 0,
  highscore2: 0
};


        await usersCollection.insertOne(newUser);

        req.session.user = {
  username,
  role: "USER"
};
console.log("Gebruiker in sessie:", req.session.user);

res.redirect("/menu");


      } catch (err) {
        console.error("❌ Fout bij registratie:", err);
        res.status(500).render("error", {
          message: "Er is een fout opgetreden bij registratie."
        });
      }
    });

    
    app.listen(PORT, () => {
      console.log(`🚀 Server draait op http://localhost:${PORT}`);
    });

  } catch (e) {
    console.error("❌ Fout bij verbinden met MongoDB:", e);
  }
}

main();




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



interface ClubsResponse {
  pagination: any;
  items: Club[];
}

export interface Player {
  id: number;
  name: string;
  position: string;
  nationality: string;
  shirtNumber?: number;
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
  squad?: Player[]; 
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
interface User {
  _id?: ObjectId;
  username: string;
  password: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  favourites: number[];         
  favouriteLeague?: number;     
  blacklistedClubs: number[];   
  highscore1: number;           
  highscore2: number;           
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

function isAuthenticated(req: Request, res: Response, next: Function) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/inlog");
  }
}


// async function fetchAllClubPages(pages: number): Promise<Club[]> {
//   const headers = {
//     Accept: "application/json",
//     "X-AUTH-TOKEN": "8ba2f493-4588-5f0d-99a2-a7a67d2c6ae6",
//   };

//   const allClubs: Club[] = [];

//   for (let page = 1; page <= pages; page++) {
//     const response = await fetch("https://api.futdatabase.com/api/clubs?page=${page}, { headers }");
//     if (!response.ok) {
//       throw new Error("API-fout op pagina ${page}: ${response.status}");
//     }

//     const data = (await response.json()) as ClubsResponse;
//     allClubs.push(...data.items);
//   }
//   console.log(allClubs)
//   return allClubs;
// }


app.get("/", (req, res) => {
  res.render("Landingspage", { title: "Welcome to Glory" });
});

app.get("/inlog", (req, res) => {
  res.render("InlogPagina", { title: "Inloggen" });
});

app.get("/registratie", (req, res) => {
  res.render("RegistratiePage", { title: "Registratie" });
});
 

app.get("/menu", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const users = await database.collection("users").find().toArray();
    res.render("Menupagina", { users });
  } catch (err) {
    console.error("Fout bij ophalen gebruikers:", err);
    res.status(500).send("Fout bij laden van leaderboard.");
  }
});

app.get("/blacklist", isAuthenticated, (req, res) => {
  
  res.render("Blacklistpage", {
    title: "Blacklist",
    user: req.session.user
  });
});
app.get("/favorieteclub", isAuthenticated, (req, res) => {
  
  res.render("FavorieteClub", {
    title: "Favoriete Club",
    user: req.session.user
  });
});
app.get("/alleclubs", isAuthenticated, async (req, res) => {
  try {
    const clubs = await database.collection("teams").find().toArray();
    res.render("Clubs", {
      title: "Alle Clubs",
      user: req.session.user,
      clubs, 
    });
  } catch (error) {
    console.error("Fout bij ophalen clubs:", error);
    res.status(500).render("error", { message: "Kan clubs niet ophalen." });
  }
});

app.get("/leagues", isAuthenticated, async (req: Request, res: Response) => {
  try {
    if (!database) {
      throw new Error("Database is niet geïnitialiseerd");
    }

    const leagues = await database.collection("leagues").find().toArray();
    const clubs = await database.collection("teams").find().toArray();

    leagues.forEach(league => {
      league.teams = clubs.filter(club => club.league === league.code);
    });

    res.render("Leagues", {
      title: "Leagues",
      user: req.session.user, 
      leagues
    });

  } catch (error) {
    console.error("Fout bij ophalen leagues:", error);
    res.status(500).send("Fout bij ophalen leagues");
  }
});




app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.redirect("/inlog");
  }

  try {
    const user = await database.collection("users").findOne({ username });

    if (!user) {
      return res.render("InlogPagina", {
        title: "Inloggen",
        error: "Gebruiker niet gevonden"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.render("InlogPagina", {
        title: "Inloggen",
        error: "Wachtwoord incorrect"
      });
    }

    req.session.user = {
      username: user.username,
      role: user.role
    };

    res.redirect("/menu");
  } catch (err) {
    console.error("Loginfout:", err);
    res.status(500).render("error", {
      message: "Interne serverfout bij inloggen."
    });
  }
});

import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      username: string;
      role: string;
    };
  }
}



// app.get("/skysoccer", (req,res)=>{
//   res.render("Jumpgame",{title:"SkySoccer"})
// })


app.get("/veelgesteldevragen", (req, res) => {
  res.render("Veelgesteldevragen", { title: "Veelgestelde Vragen" });
});

app.get("/soccersky", (req, res) => {
  res.render("JumpGame", { title: "Soccer Sky" });
});

app.get("/clubdetails/:id", async (req: express.Request, res: express.Response) => {
  try {
    const clubId = req.params.id;
    let club;

    if (!isNaN(Number(clubId))) {
      club = await database.collection("teams").findOne({ id: Number(clubId) });
    } else {
      club = await database.collection("teams").findOne({ _id: new ObjectId(clubId) });
    }

    if (!club) {
      res.status(404).send("Club not found");
      return;
    }

    

    res.render("ClubDetail", { 
      title: club.name, 
      club 
    });
  } catch (error) {
    console.error("Error fetching club details:", error);
    res.status(500).send("Internal Server Error");
  }
});




app.get("/quiz", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const allClubs = Object.keys(clubLogos);

    const correctAnswer = allClubs[getRandomInt(allClubs.length)];
    const logoUrl = clubLogos[correctAnswer];
    const options = getShuffledOptions(correctAnswer, allClubs);

    const username = req.session.user?.username;

    const user = await database.collection("users").findOne({ username });

    const highscore = user?.highscore1 || 0;

    res.render("quizpage", {
      logoUrl,
      correctAnswer,
      options,
      highscore 
    });
  } catch (error) {
    console.error("Fout bij ophalen clubs:", error);
    res.status(500).send("Er ging iets mis bij het laden van de quiz.");
  }
});



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

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Fout bij uitloggen:", err);
    }
    res.redirect("/inlog");
  });
});
app.post("/api/user/preferences", isAuthenticated, async (req, res) => {
  const { favourites, favouriteLeague, blacklistedClubs } = req.body;
  const username = req.session.user?.username;

  try {
    await database.collection("users").updateOne(
      { username },
      {
        $set: {
          favourites,
          favouriteLeague,
          blacklistedClubs,
        },
      }
    );
    res.json({ message: "Voorkeuren opgeslagen" });
  } catch (error) {
    console.error("Fout bij opslaan voorkeuren:", error);
    res.status(500).json({ error: "Opslaan mislukt" });
  }
});

app.post("/api/save-score", async (req: Request, res: Response): Promise<void> => {
  const { score } = req.body;
  const username = req.session.user?.username;

  if (!username) {
    res.status(401).json({ error: "Niet ingelogd" });
    return;
  }

  try {
    const users = database.collection<User>("users");
    const user = await users.findOne({ username });

    if (!user) {
      res.status(404).json({ error: "Gebruiker niet gevonden" });
      return;
    }

    if (score > user.highscore1) {
      await users.updateOne({ username }, { $set: { highscore1: score } });
      res.json({ message: "Nieuwe highscore opgeslagen!" });
    } else {
      res.json({ message: "Score lager dan highscore, niet opgeslagen" });
    }
  } catch (err) {
    console.error("Fout bij opslaan score:", err);
    res.status(500).json({ error: "Er ging iets mis bij het opslaan" });
  }
});
app.get("/leaderboard", async (req, res) => {
  try {
    const users = await database.collection<User>("users")
      .find({}, { projection: { username: 1, highscore1: 1, highscore2: 1 } })
      .sort({ highscore1: -1 }) 
      .toArray();

    res.render("Leaderboard", {
      title: "Leaderboard",
      users
    });
  } catch (err) {
    console.error("Fout bij ophalen leaderboard:", err);
    res.status(500).render("error", { message: "Leaderboard ophalen mislukt." });
  }
});




