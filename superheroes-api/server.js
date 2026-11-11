
const app = require("./src/app");
const sequelize = require("./src/database/database");

const PORT = 3000;

async function startServer() {
    try {
        // Sincroniza o banco de dados.
        await sequelize.sync();

        console.log("Banco de Dados sincronizado.");

        app.listen(PORT, () => {
            console.log(`Server rodando em http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Erro ao sincronizar o banco de dados:", error);
        process.exit(1);
    }
}

startServer();
