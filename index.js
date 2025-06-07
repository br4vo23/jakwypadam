const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());

// FUNKCJA ANALIZY SEO
async function analyzeSEO(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content');
        const h1count = $('h1').length;
        const h2count = $('h2').length;

        let score = 0;
        if (title && title.length > 10) score += 25;
        if (description && description.length > 30) score += 25;
        if (h1count >= 1) score += 25;
        if (h2count >= 2) score += 25;

        return {
            score,
            title,
            description,
            h1count,
            h2count
        };
    } catch (error) {
        return {
            score: 0,
            error: `Błąd podczas analizy: ${url}`
        };
    }
}

// GŁÓWNA TRASA API
app.post('/api/compare', async (req, res) => {
    const { stronaA, stronaB } = req.body;

    const seoA = await analyzeSEO(stronaA);
    const seoB = await analyzeSEO(stronaB);

    const result = {
        seo: {
            punktyA: seoA.score,
            punktyB: seoB.score,
            szczegoly: { A: seoA, B: seoB }
        },
        wcag: {
            punktyA: 0,
            punktyB: 0
        },
        maps: {
            opis: "Ten moduł jeszcze w budowie 🙂"
        },
        zalecenia: [
            "Dodaj mapę Google do sekcji kontakt.",
            "Popraw strukturę nagłówków.",
            "Uzupełnij meta title i description."
        ]
    };

    res.json(result);
});

// START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
