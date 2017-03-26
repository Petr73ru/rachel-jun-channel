'use strict'
var 
request = require('request'),
totalVideo, // Sum of all videos
lastVideoDate,

answer = [] //Return all video items

function getVideoItems(callback){

	request(__createRequest_link(null), function (error, response, body) {
    	//Check for error
    	if(error){
        	return console.log('Error: ', error);
    	}

    	//Check for right status code
    	if(response.statusCode !== 200){
        	return console.log('Invalid Status Code Returned: ', response.statusCode);
    	}

    	// if all is good
    	console.log('request done!'); 

    	body = JSON.parse(body)

    	if (lastVideoDate === undefined) {
    		totalVideo = body.pageInfo.totalResults  // Sum of all videos from channel; set only in first request
    	}

    	let items = body.items || null // Massiv of objects or null
    	
    	console.log("totalVideo = " + totalVideo) // Console log
    	console.log('Total results : ' + body.pageInfo.totalResults)
    	items.forEach((item, index)=> { // Items push to answer
    		answer.push(item)
    	})

    	if (answer.length < totalVideo) {
    		lastVideoDate = answer[answer.length - 1].snippet.publishedAt // Seting date of last in list video
    		getVideoItems(callback)
    	} else {
    		callback(null, answer)
    	}
    
	});
}

function __createRequest_link(time) {
	let request_link = {
		url: 'https://www.googleapis.com/youtube/v3/search',
    	qs: {part: 'snippet', order: 'date', publishedBefore: lastVideoDate, channelId: 'UC4yqcgz49APdbgj0OMv7jpA', maxResults: 50, key: 'AIzaSyAEc6reXtKwVemgtV9MypLcOHE2dnovLMY'},
    	method: 'GET',
		}
	request_link.publishedBefore = lastVideoDate
	console.log('publishedBefore : ' + request_link.publishedBefore)
	return request_link
}



module.exports = getVideoItems