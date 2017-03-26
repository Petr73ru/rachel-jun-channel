'use strict'
let
request = require('./request-module'),
fs = require('fs'),
express = require('express'),

app = express(),
port = process.env.PORT || 3000

app.get('/', (req, res)=>{

    request((err, data)=> {
        if (err) {
            console.error(err)
        }

        let items = data,
        i=1 //счётчик
        for (let item of items){
            res.write('<div class="card_for_video_info">' + i + ':<br>')
            res.write('title : '+item.snippet.title + '<br>'+
            'publishedAt : ' + item.snippet.publishedAt + '<br>' +
            'description : '+item.snippet.description + '<br>'+
            'videoId : ' +item.id.videoId + '</div><br><br>' )
            i++
        }
        res.end()
    })
})

app.get('/html', (req, res)=> {

    fs.readFile("index.html", function(err, data){
        if (err) {
            res.writeHead(404)
            res.write('Not found html file!')
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
        }
        res.end();
    });
})

app.listen(port,()=>{
	console.log('app lisen on port: ' + port)
})
