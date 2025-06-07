const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/compare', async (req, res) => {
    const { stronaA, stronaB } = req.body;

    // Tu w przyszłości dodasz analizę SEO, WCAG itp.
    // Tymczasem symulujemy dane:
    const fakeData = {
        seo: { punktyA: 65, punktyB: 78 },
        wcag: { punktyA: 50, punktyB: 72 },
        maps: { opis: "Strona A nie ma mapy, strona B ma Google Maps." },
        zalecenia: [
            "Dodaj mapę Google do sekcji kontakt.",
            "Popraw strukturę nagłówków.",
            "Uzupełnij meta title i description."
        ]
    };

    res.json(fakeData);
});

app.listen(3000, () => console.log('Serwer działa na porcie 3000'));
