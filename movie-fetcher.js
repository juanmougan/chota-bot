let fetch = require('node-fetch');
let utils = require('./utils');

class MovieFetcher {
    
    constructor() {
        this.baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=a7dc625117e31b1b8294e494696b4de7&language=es-ES&include_adult=true`;
        this.query = [ {"la" : "chota" }, {"le" : "chota" }, {"de" : "chota" }, {"que" : "chota" }, {"un" : "chota" }, {"del" : "chota" }, {"con" : "chota" } ]
    }
    
    getTitle(callback)  {
        let url = this.baseUrl + `&page=${utils.random(1, 10)}`;
        let query = this.query[utils.random(0, this.query.length - 1)];
        url += `&query=${Object.keys(query)[0]}`;
        fetch(url)
            .then((res) => { return res.json() })
            .then((data) => {
                let title = data.results[utils.random(0, data.results.length - 1)].title;
                let titleWords = title.split(" ");
    
                let replaceDone = false;
                let i = 0;
                while(i <= titleWords.length | !replaceDone) {
                    let index = utils.random(0, titleWords.length - 1);
                    if(!utils.isStopWord(titleWords[index].toLowerCase())) {
                        replaceDone = true;
                        titleWords[index] = utils.findChotoGender(titleWords, index - 1);
                        break;
                    }
                    i++;
                }
                if(!replaceDone || titleWords.length == 1) { titleWords[0] = "Chota" }
                if(/^(el|la|lo|los|las|se|le|les|un)\s(chota|choto)$/.test(titleWords.join(" ").toLowerCase())) {
                    this.getTitle(callback)
                } else {
                    callback(titleWords.join(" ") + ` - (${title})`);
                }
    
            })
            .catch((err) => { console.error(err); res.send(500, err)})
    }    
}

module.exports = MovieFetcher;


