const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// köztes middleware-ek
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// alap route: frontend megjelenítése
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index2.html'));
});

// API végpont: regisztráció
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Hiányzó adat' });
  }

  console.log('Új regisztráció:', { username, email });
  res.json({ success: true, message: 'Sikeres regisztráció (teszt)' });
});

// szerver indítása
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});
