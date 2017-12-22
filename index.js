'use strict'
let
request = require('./request-module'),
fs = require('fs'),
express = require('express'),
channelId = 'UCyUBW72KU30dfAYWLVNZO8Q',

app = express(),
port = process.env.PORT || 3000

app.get('/', (req, res)=>{

    request((err, data)=> {
        if (err) {
            console.error(err)
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	      res.writeHead(200, {'Content-Type': 'application/json'});

        res.write(JSON.stringify(data))
        res.end()
    }, channelId)
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
