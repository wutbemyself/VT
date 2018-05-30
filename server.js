const express = require('express');
// logger = require('./logger'),
const bodyParser = require('body-parser');
const path = require('path');
// _ = require('lodash'),
const http = require('http');
const app = express();

const api = require('./app/routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const port = process.env.PORT || '8098';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on loclhost:${port}`));

