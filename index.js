'use strict'
let
request = require('./request-module'),
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
            res.write(i + ':\n')
            res.write('title : '+item.snippet.title + '\n'+
            'publishedAt : ' + item.snippet.publishedAt + '\n' +
            'description : '+item.snippet.description + '\n'+
            'videoId : ' +item.id.videoId + '\n\n' )
            i++
        }

        res.end()
    })


})

app.listen(port,()=>{
	console.log('app lisen on port: ' + port)
})
