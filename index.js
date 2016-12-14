let restify = require('restify');
let MovieFetcher = require("./movie-fetcher");
let movieFetcher = new MovieFetcher();
require('./telegram-bot');

let server = restify.createServer({
	name: 'chota-bot',
	version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get("/movie", (req, res, next) => {
    movieFetcher.getTitle((titleResult) => { res.send(200, {title : titleResult }) });
});

server.listen(process.env.PORT || 8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});
