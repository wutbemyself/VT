const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const passport = require('passport');
const api = require('./app/routes/api');
var log4js = require('log4js');
var logger = log4js.getLogger('KEEEN-VT');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
// require('./app/config/passport')(passport);

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const port = process.env.PORT || '8098';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server run on port ${port}`)
}
);

