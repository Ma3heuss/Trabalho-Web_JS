const express = require("express"); //importando tudo (descerialização)
const sequelize = require("./database/database");

const Hero = require("./models/Hero");
const Movie = require("./models/Movie");
const heroesRoutes = require("./routes/heroes.routes");

const app = express();
app.use(express.json());

Hero.belongsToMany(Movie, {
    through: "HeroMovies"
})

Movie.belongsToMany(Hero, {
    through: "MoviesHero"
})

app.use("/heroes", heroesRoutes);

sequelize.sync()
    .then(() => { //função q n tem nome, só executa (arrow function) 
        console.log("Banco de Dados sincronizado.")
    }) 

    .catch((error) => { 
        console.error("Erro a sincronizar o Banco", error)
    })

module.exports = app