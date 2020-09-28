const Database = require('./implementations/database');
new Database().init();

const app = require('./controllers/routes');

const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
