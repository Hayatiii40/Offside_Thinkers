import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import bcrypt from "bcrypt";
import clubsData from "./clubs.json"
import session from 'express-session';
import {Db, MongoClient,ObjectId} from "mongodb";

const app = express();
const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://Dzhaner:12345678Dzhaner@cluster0.pa8gmws.mongodb.net/";
const client = new MongoClient(uri);
let database: Db
const api_token = "1844727b6fd7406bbcae874d539f5dc2";
const clubLogos: { [key: string]: string } = clubsData.clubLogos;
const aliases: { [key: string]: string } = clubsData.aliases;

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





app.get("/", (req, res) => {
  res.render("Landingspage", { title: "Welcome to Glory" });
});

app.get("/inlog", (req, res) => {
  res.render("InlogPagina", { title: "Inloggen" });
});

app.get("/registratie", (req, res) => {
  res.render("RegistratiePage", { title: "Registratie" });
});
 

app.get("/menu",isAuthenticated, async (req: Request, res: Response) => {
  try {
    const users = await database.collection("users").find().toArray();
    res.render("Menupagina", { users });
  } catch (err) {
    console.error("Fout bij ophalen gebruikers:", err);
    res.status(500).send("Fout bij laden van leaderboard.");
  }
});



/*-favc-*/
app.get("/favorieteclub", isAuthenticated, async (req, res) => {
  try{
  const username = req.session.user?.username;
  const user = await database.collection<User>("users").findOne({username});
  if(!user){
    return res.status(404).render("error",{message:"Gebruiker niet gevonden"});
  }

  let favorieteClub = await database.collection<Club>("teams").find({ id: { $in:user.favourites } }).toArray();
  
  res.render("FavorieteClub", {
    title: "Favoriete Club",
    clubs: favorieteClub,
    user: req.session.user
  });
}catch(err){
  console.error("Fout bij het ophalen van de favoriete teams.", err)
  return res.status(500).render("error",{message: "Favorieten laden is niet gelukt, sory."});
}
});
app.post("/verwijder-favoriet",async (req,res)=>{
  const username = req.session.user?.username;
  const clubId = parseInt(req.body.clubId);
  try{ 
    await database.collection<User>("users").updateOne({username},{$pull:{favourites:clubId}});
    
    res.redirect("/favorieteclub")
  }catch(err){
    console.error("Fout bij het verwijderen",err);
    res.status(500).send("Foutbij het verwijderen");
  }
})
app.post("/toevoegen-favorieteclub",async (req,res)=>{
  const username = req.session.user?.username;
  const clubId = parseInt(req.body.clubId);
  try{

    await database.collection<User>("users").updateOne({username},{$addToSet:{favourites:clubId}});

    res.redirect("/alleclubs")
  }catch(er){
    console.error("Fout bij het toevoegen",er)
    res.status(500).send("Fout bij het toeveogen");
  }
})



/*-favc-*/
/*-blacklist-*/
app.get("/blacklist", isAuthenticated, async (req, res) => {
  try {
    let username = req.session.user?.username;
    let user = await database.collection<User>("users").findOne({username});

    if(!user){
      return res.status(404).render("error",{message:"Gebruiker niet gevonden"});
    }
    const blacklistedClubs = await database.collection<Club>("teams").find({id:{$in:user.blacklistedClubs}}).toArray();
    
    res.render("Blacklistpage", {
    title: "Blacklist",
    user: req.session.user,
    clubs: blacklistedClubs
  });
  } catch (error) {
    console.log(error);
    res.status(500).send("Probleem bij het ophalen van de blacklisted teams")
  }
  
});
app.post("/toevoegen-blacklist", async(req,res)=>{
  try{
    const username = req.session.user?.username;
    const clubId = parseInt(req.body.clubId);    
    if(!username ){
      return console.error("Probleem bij het vinden van de username.")
    }
    if(!clubId){
      return console.error("Probleem bij het vinden van de club id.")
    }
    await database.collection<User>("users").updateOne({username},{$addToSet:{blacklistedClubs:clubId}});
    res.redirect("/alleclubs")
  }catch(err){
    console.error("Fout bij het toeveogen van blacklisted club")
    return res.status(500).render("Fout bij het toevoegen van blacklisted team");
  }
})
app.post("/verwijder-blacklist",async (req,res)=>{
  try {
    const username = req.session.user?.username;
    const clubId = parseInt(req.body.clubId);
    if(!clubId){
      return console.error("Probleem bij het vinden van de club id");
    }
    if(!username){
      return console.error("Probleem bij het vinden van de username");
    }
    await database.collection<User>("users").updateOne({username},{$pull:{blacklistedClubs:clubId}});
    res.redirect("/blacklist");
  } catch (error) {
    console.error("Fout bij het verwijderen van de blackliste club")
    return res.status(500).render("Fout bij het verwijderen van de blacklisted club");
  }
})



/*-blacklist-*/
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
import { Console } from "console";

declare module "express-session" {
  interface SessionData {
    user?: {
      username: string;
      role: string;
    };
  }
}



app.get("/skysoccer", (req,res)=>{
  res.render("JumpGame",{title:"SkySoccer"})
})


app.get("/veelgesteldevragen", (req, res) => {
  res.render("Veelgesteldevragen", { title: "Veelgestelde Vragen" });
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



