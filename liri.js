var keys = require('./keys.js')
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs')
var command = process.argv[2];
var nodeArg = process.argv

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var spotify = new Spotify({
  id: keys.spotifyKeys.client_id,
  secret: keys.spotifyKeys.client_secret
});

switch (command) {
  case 'my-tweets':
    myTweets();
    break;

  case 'spotify-this-song':
    spotifyThis();
    break;

  case 'movie-this':
    movieThis();
    break;

  case 'do-what-it-says':
    doThis();
    break;
}

function myTweets() {

  var params = { screen_name: 'steventran_3' };

  client.get('statuses/user_timeline', params, function (err, tweets, response) {

    if (err) {
      console.log(err);
    }
    else {
      for (var i = 0; i <= 19; i++) {
        console.log('Tweeted: ', tweets[i].text)
        console.log('Time Tweeted: ', tweets[i].created_at)
        console.log('--------------------------------------')
      }
    }
  });
}

function spotifyThis() {
  var songName = '';

  for (var i = 3; i < nodeArg.length; i++) {
    songName += nodeArg[i] + ' ';
  }
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var albumTrack = data.tracks.items;

    for (i = 0; i < albumTrack.length; i++) {
      console.log('-------------------------------------------------')
      console.log("Artist: " + albumTrack[i].artists[i].name);
      console.log("Album Title: " + albumTrack[i].album.name);
      console.log("Spotify Link: " + albumTrack[i].preview_url);
      console.log("Track Title: " + albumTrack[i].name);
      console.log('-------------------------------------------------')
    }
  });
}

function movieThis() {
  
  var movieName = '';

  for (var i = 3; i < nodeArg.length; i++) {
    movieName += nodeArg[i] + ' ';
  }

  request("https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function (err, response, body) {
    // console.log('error:', err); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var parsedBody = JSON.parse(body)
    // console.log('body:', JSON.parse(body)); 
    console.log('-------------------------------------------------')
    console.log('Movie Title: ' + parsedBody.Title);
    console.log('IMDB Rating: ' + parsedBody.Ratings[0].Value);
    console.log('Rotten Tomatoe Rating: ' + parsedBody.Ratings[1].Value);
    console.log('Country produced: ' + parsedBody.Country);
    console.log('Language: ' + parsedBody.Language);
    console.log('Plot: ' + parsedBody.Plot);
    console.log('Actors: ' + parsedBody.Actors);
    console.log('-------------------------------------------------')
  });
}

function doThis() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    console.log(data)
    
  });
}


