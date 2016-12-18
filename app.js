'use strict';

let restify = require('restify');
let movieFetcher = require("./movie-fetcher");
require('./telegram-bot');

let server = restify.createServer({
    name: 'chota-bot',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get("/", (req, res, next) => {
    res.redirect(302, "/movie", next);
});

server.get("/movie", (req, res, next) => {
    movieFetcher.getTitle((err)=> {res.send(500, err)}, (titleResult) => { res.send(200, {title : titleResult }) });
});

server.listen(process.env.PORT || 8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
