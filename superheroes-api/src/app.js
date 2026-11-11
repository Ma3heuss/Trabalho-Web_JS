
const express = require("express");

const Hero = require("./models/Hero");
const Movie = require("./models/Movie");
const heroesRoutes = require("./routes/heroes.routes");

const app = express();

app.use(express.json());

// Relacionamento entre Hero e Movie.
Hero.belongsToMany(Movie, {
    through: "HeroMovies"
});

Movie.belongsToMany(Hero, {
    through: "HeroMovies"
});

// Rotas de Hero.
app.use("/heroes", heroesRoutes);

// Tratamento de JSON inválido.
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({
            message: "O JSON enviado é inválido."
        });
    }

    console.error("Erro inesperado:", error);

    return res.status(500).json({
        message: "Erro interno do servidor."
    });
});

module.exports = app;
