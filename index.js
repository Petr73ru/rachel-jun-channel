'use strict'
let
request = require('request'),
express = require('express'),

answer = '',
request_link = {
	url: 'https://www.googleapis.com/youtube/v3/search',
    qs: {part: 'snippet', order: 'date', channelId: 'UC15v9_YDj9N7L6zVI60aK7w', maxResults: 50, key: 'AIzaSyAEc6reXtKwVemgtV9MypLcOHE2dnovLMY'},
    method: 'GET',
	},

app = express(),
port = process.env.PORT || 3000

app.get('/', (req, res)=>{

	request(request_link, function (error, response, body) {
    //Check for error
    if(error){
        return console.log('Error:', error);
    }

    //Check for right status code
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }

    // if all is good
    console.log('request done!'); 

    body = JSON.parse(body)

    
    let items = body.items || null,
        i=1 //счётчик
    for (let item of items){
        res.write(i + ':\n')
        res.write('title : '+item.snippet.title + '\n'+
        'description : '+item.snippet.description + '\n'+
        'channelId : ' +item.id.videoId + '\n\n' )
        i++
    }

    res.end()
});
})

app.listen(port,()=>{
	console.log('app lisen on port: ' + port)
})
