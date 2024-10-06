const express = require("express");
const path = require("path");
const app = express();

// Configurer EJS comme moteur de templates
app.set("view engine", "ejs");

// Définir le dossier public pour les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Middleware pour vérifier les heures d'accès (9h-17h, Lundi à Vendredi)
function checkWorkingHours(req, res, next) {
  const now = new Date();
  const day = now.getDay(); // 0 pour dimanche, 6 pour samedi
  const hour = now.getHours(); // Heures (0-23)

  // Vérifier si on est entre lundi (1) et vendredi (5) et entre 9h et 17h
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Si oui, on continue vers la page demandée
  } else {
    res.send(
      "Le site est accessible uniquement pendant les heures de travail (Lundi-Vendredi, 9h-17h)."
    );
  }
}

// Appliquer le middleware sur toutes les routes
app.use(checkWorkingHours);

// Routes
app.get("/", (req, res) => {
  res.render("index"); // Render la page d'accueil
});

app.get("/services", (req, res) => {
  res.render("services"); // Render la page "Nos services"
});

app.get("/contact", (req, res) => {
  res.render("contact"); // Render la page "Nous contacter"
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
