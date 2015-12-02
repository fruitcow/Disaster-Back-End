var async = require('async');
var http = require('http');
var GeoJSON = require('geojson');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./result");


result = [];
var LandSlideParse = require('./modules/LandSlideParse.js');
var EarthQuakeParse = require('./modules/EarthQuakeParse.js');
var fs = require('fs');
var Lanslidefile="./result/land.json";
var Earthquakefile="./result/earth.json";
var GeoJSONFile="";

async.series({
    a:function(cb){LandSlideParse("https://data.nasa.gov/api/views/9ns5-uuif/rows.json?accessType=DOWNLOAD",Lanslidefile,cb);},
    b:function(cb){EarthQuakeParse("https://raw.githubusercontent.com/infographicstw/global-earthquake/master/quake.json",Earthquakefile,cb);},	

},function(err,results) {
	if(err)throw err;
	result = GeoJSON.parse(result, {Point: ['Latitude', 'Longitude'], 'Disaster':'Disaster', 'Magnitude':'Magnitude'});
	console.log(result.length);
    fs.writeFileSync("./result/result.json",JSON.stringify(result));
    
});


var server = http.createServer(function(req, res) {
	 console.log("some asshole is login ");
  var done = finalhandler(req, res);
  serve(req, res, done);
 
});

server.listen(process.env.PORT || 3000);