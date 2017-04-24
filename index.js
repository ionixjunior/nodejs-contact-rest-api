var express = require('express');
var port = 3000;
var app = express();
var bodyParser = require('body-parser');
var basicAuth = require('express-basic-auth');
var basicAuthRouter = basicAuth({
    users: {'admin':'123'},
    unauthorizedResponse: 'Invalid credentials'
});
var fs = require('fs');
var https = require('https');
var expressLogger = require('express-logger');

var cert = {
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.crt')
};

var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/contacts');

ContactRouterV1_0 = require('./src/routes/v1.0/contact');
ContactRouterV2_0 = require('./src/routes/v2.0/contact');

app.use(expressLogger({ path: './log/log.txt' }));
app.use(basicAuthRouter);
app.use(bodyParser.json());
app.use('/v1.0', ContactRouterV1_0);
app.use('/v2.0', ContactRouterV2_0);

// https.createServer(cert, app).listen(port, function () {
//     console.log('Server running...');
// });

app.listen(port, function () {
    console.log('Server running...');
});