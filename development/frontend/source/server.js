const app = require('./routes');

const PORT = process.env.WEB_PORT;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);