const Hero = require ("../models/Hero")

async function list(paramsreq, res) {
    const movies = await Hero.findAll()
    return res.status(200).json(movies);
}

async function create(req,res){

    const { name, universe, power } = req.body;  //descerialização

    if (!name || !universe || !power){
        return res.status(400).json({
            message: "Nome, universo e poder são obrigatórios"
        });
    }

    const hero = await Hero.create({name, universe, power});
    return res.status(201).json(hero);
}

//pesquisar assinc await
module.exports = {
    list,
    create
};