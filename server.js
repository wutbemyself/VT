const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const passport = require('passport');
const api = require('./app/routes/api');
const user = require('./app/routes/routes');
var logger = require('./app/utils/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
// require('./app/config/passport')(passport);

// const models = require('./models');

// models.product.findAll().then(response => {
//     var data = [];
//     response.forEach(dataValues => {
//         data.push({
//             createdAt: dataValues.createdAt,
//             description: dataValues.description,
//             id: dataValues.id,
//             name: dataValues.name,
//             updatedAt: dataValues.updatedAt
//         });
//         // console.log(dataValues);
//     });
//     data.forEach(element => {
//         console.log(element);
//     });
// })

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', api);
app.use('/api', user);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const port = process.env.PORT || '8098';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server run on port ${port}`),
    logger.write('data', 'debug', '#Server run on port : 8089');
}

);

