import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.render('Landingspage', { title: 'Welcome to Glory' });
});

app.get('/inlog', (req, res) => {
  res.render('InlogPagina', { title: 'Inloggen' });
});

app.get("/registratie",(req, res)=>{
  res.render("RegistratiePage",{title: "Registratie" });
})

app.get("/menu",(req,res)=>{
  res.render("Menupagina",{title: "Menu"});
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    // Simpele check: later kan je hier echte authenticatie doen
    res.redirect('/menu');
  } else {
    // Terug naar de inlogpagina als velden leeg zijn
    res.redirect('/inlog');
  }
});

app.get('Veelgesteldevragen',(req,res)=>{
  res.render
})

// Start server
app.listen(PORT, () => {
  console.log(`JA, Server running at http://localhost:${PORT}`);
});
