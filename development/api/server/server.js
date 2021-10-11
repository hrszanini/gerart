const Database = require('./implementations/database').Database;
const databse = new Database();
databse.Initialization();

const app = require('./controllers/routes');

const PORT = process.env.API_PORT;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);