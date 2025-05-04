import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

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
  Southampton: "https://upload.wikimedia.org/wikipedia/en/c/c9/Southampton_FC_crest.svg",
  "Tottenham Hotspur": "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
  "West Ham": "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
  "FC Bayern Munich": "https://upload.wikimedia.org/wikipedia/commons/1/1f/FC_Bayern_München_logo_%282017%29.svg",
  "Borussia Dortmund": "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
};

const aliases: { [key: string]: string } = {
  "Man Utd": "Manchester United",
  "Manchester Utd": "Manchester United",
  "Newcastle Utd": "Newcastle United",
  "Nott'm Forest": "Nottingham Forest",
  QPR: "Queens Park Rangers",
  Spurs: "Tottenham Hotspur",
  "FC Bayern München": "FC Bayern Munich",
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

app.get("/quiz", async (req: Request, res: Response) => {
  const apiUrl = "https://api.futdatabase.com/api/clubs?page=1";
  const headers = {
    Accept: "application/json",
    "X-AUTH-TOKEN": "8ba2f493-4588-5f0d-99a2-a7a67d2c6ae6", // Let op: vervang als nodig
  };

  try {
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(`API failed: ${response.status}`);
    }

    const data = (await response.json()) as ClubsResponse;

    const clubList = data.items
      .map((club) => {
        const resolvedName = aliases[club.name] || club.name;
        return {
          id: club.id,
          name: resolvedName,
          logoUrl: clubLogos[resolvedName] || "/images/default-logo.png",
        };
      })
      .filter((club) => club.logoUrl !== "/images/default-logo.png");

    const selected = clubList[getRandomInt(clubList.length)];
    const options = getShuffledOptions(selected.name, clubList.map((c) => c.name));

    res.render("quiz", {
      logoUrl: selected.logoUrl,
      correctAnswer: selected.name,
      options,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Er ging iets mis met het ophalen van de clubs.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
