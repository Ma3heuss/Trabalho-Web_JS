
const Hero = require("../models/Hero");


// listar todos os herois
async function list(req, res) {
    try {
        const heroes = await Hero.findAll();
        return res.status(200).json(heroes);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao listar heróis.",
            error: error.message
        });
    }
}


// buscar heroi pelo ID
async function getById(req, res) {
    try {
        const hero = await Hero.findByPk(req.params.id);

        if (!hero) {
            return res.status(404).json({
                message: "Herói não encontrado."
            });
        }

        return res.status(200).json(hero);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar herói.",
            error: error.message
        });
    }
}


// cadastrar heroi
async function create(req, res) {
    try {
        const { name, universe, power } = req.body;

        if (!name || !universe || !power) {
            return res.status(400).json({
                message: "Nome, universo e poder são obrigatórios"
            });
        }

        const hero = await Hero.create({
            name,
            universe,
            power
        });

        return res.status(201).json(hero);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao cadastrar herói.",
            error: error.message
        });
    }
}


// atualizar parcialmente heroi (PATCH)
async function patch(req, res) {
    try {
        const hero = await Hero.findByPk(req.params.id);

        if (!hero) {
            return res.status(404).json({
                message: "Herói não encontrado."
            });
        }

        const { name, universe, power } = req.body;

        if (name === undefined && universe === undefined && power === undefined) {
            return res.status(400).json({
                message: "Envie pelo menos um campo para atualizar."
            });
        }

        if (name !== undefined) hero.name = name;
        if (universe !== undefined) hero.universe = universe;
        if (power !== undefined) hero.power = power;

        await hero.save();

        return res.status(200).json(hero);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar parcialmente herói.",
            error: error.message
        });
    }
}


// atualizar todos os dados do heroi (PUT)
async function update(req, res) {
    try {
        const hero = await Hero.findByPk(req.params.id);

        if (!hero) {
            return res.status(404).json({
                message: "Herói não encontrado."
            });
        }

        const { name, universe, power } = req.body;

        if (!name || !universe || !power) {
            return res.status(400).json({
                message: "Nome, universo e poder são obrigatórios."
            });
        }

        hero.name = name;
        hero.universe = universe;
        hero.power = power;

        await hero.save();

        return res.status(200).json(hero);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar herói.",
            error: error.message
        });
    }
}


// excluir heroi
async function remove(req, res) {
    try {
        const hero = await Hero.findByPk(req.params.id);

        if (!hero) {
            return res.status(404).json({
                message: "Herói não encontrado."
            });
        }

        await hero.destroy();

        return res.status(200).json({
            message: "Herói excluído com sucesso."
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao excluir herói.",
            error: error.message
        });
    }
}


// exportar as funcoes
module.exports = {
    list,
    getById,
    create,
    patch,
    update,
    remove
};
