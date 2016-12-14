let restify = require('restify');
let fetch = require('node-fetch');
let bot = require('./telegram-bot');

let server = restify.createServer({
	name: 'chota-bot',
	version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

let baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=a7dc625117e31b1b8294e494696b4de7&language=es-AR&query=la&include_adult=true`;
let stopword = ['el','la','los','les','las','de','del','a','ante','con','en','para','por','y','o','u','tu','te','ti','le','que','al','ha','un','han','lo','su','una','estas','esto','este','es','tras','suya','a','acá','ahí','al','algo','algún','alguna','algunas','alguno','algunos','allá','alli','allí','ambos','ante','antes','aquel','aquella','aquellas','aquello','aquellos','aqui','aquí','arriba','asi','atras','aun','aunque','bastante','bien','cabe','cada','casi','cierta','ciertas','cierto','ciertos','como','cómo','con','conmigo','conseguimos','conseguir','consigo','consigue','consiguen','consigues','contigo','contra','cual','cuales','cualquier','cualquiera','cualquieras','cuancuán','cuando','cuanta','cuánta','cuantas','cuántas','cuanto','cuánto','cuantos','cuántos','de','dejar','del','demás','demas','demasiada','demasiadas','demasiado','demasiados','dentro','desde','donde','dos','el','él','ella','ellas','ello','ellos','empleais','emplean','emplear','empleas','en','encima','entonces','entre','era','eramos','eran','eras','eres','es','esa','esas','ese','eso','esos','esta','estaba','estado','estais','estamos','estan','estar','estas','este','esto','estos','estoy','etc','fin','fue','fueron','fui','fuimos','ha','hace','haceis','hacemos','hacen','hacer','haces','hacia','hago','hasta','incluso','intenta','intentais','intentamos','intentan','intentar','intentas','intento','ir','jamás','junto','juntos','la','largo','las','lo','los','mas','más','me','menos','mi','mía','mia','mias','mientras','mio','mío','mios','mis','misma','mismas','mismo','mismos','modo','mucha','muchas','muchísima','muchísimas','muchísimo','muchísimos','mucho','muchos','muy','nada','ni','ningun','ninguna','ningunas','ninguno','ningunos','no','nos','nosotras','nosotros','nuestra','nuestras','nuestro','nuestros','nunca','os','otra','otras','otro','otros','para','parecer','pero','poca','pocas','poco','pocos','podeis','podemos','poder','podria','podriais','podriamos','podrian','podrias','por','por','qué','porque','primero','primero','desde','puede','pueden','puedo','pues','que','qué','querer','quien','quién','quienes','quienes','quiera','quienquiera','quiza','quizas','sabe','sabeis','sabemos','saben','saber','sabes','se','segun','ser','si','sí','siempre','siendo','sin','sín','sino','so','sobre','sois','solamente','solo','somos','soy','sr','sra','sres','esta','su','sus','suya','suyas','suyo','suyos','tal','tales','también','tambien','tampoco','tan','tanta','tantas','tanto','tantos','te','teneis','tenemos','tener','tengo','ti','tiempo','tiene','tienen','toda','todas','todo','todos','tomar','trabaja','trabajais','trabajamos','trabajan','trabajar','trabajas','tras','tú','tu','tus','tuya','tuyo','tuyos','ultimo','un','una','unas','uno','unos','usa','usais','usamos','usan','usar','usas','uso','usted','ustedes','va','vais','valor','vamos','van','varias','varios','vaya','verdad','verdadera','vosotras','vosotros','voy','vuestra','vuestras','vuestro','vuestros','y','ya','yo','como','cómo','hacer','se','tengo','algun','verdadero','sido','son']

let random = (min, max) => {
	return page = Math.floor(Math.random() * (max - min) + min);

};

let getTitle = (callback) => {
	let page = random(1, 10)
	let url = baseUrl + `&page=${page}`;
	fetch(url)
		.then((res) => { return res.json() })
		.then((data) => {
			let title = data.results[random(0, data.results.length)].title;
			let titleWords = title.split(" ");

			let replaceDone = false;
			let i = 0;
			while(i <= titleWords.length | !replaceDone) {
				let index = random(0, titleWords.length);
				if(stopword.indexOf(titleWords[index].toLowerCase()) == -1) {
					replaceDone = true
					titleWords[index] = "chota"
					break;
				}
				i++;
			}
			if(!replaceDone) { titleWords[0] = "chota" }
			if(/^(el|la)\schota$/.test(titleWords.join(" ").toLowerCase())) {
				getTitle(callback)
			} else {
				callback(titleWords.join(" ") + ` - (${title})`);
			}

		})
		.catch((err) => { console.error(err); res.send(500, err)})
}

server.get("/movie", (req, res, next) => {
	getTitle((titleResult) => {res.send(200, {title : titleResult })});
});

server.listen(process.env.PORT || 8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});

bot.onText(/\/movie/, function (msg, match) {
    let chatId = msg.chat.id;
    let resp = match[1]; // the captured "whatever"
    
    getTitle((titleResult) => {bot.sendMessage(chatId, titleResult);})
});
