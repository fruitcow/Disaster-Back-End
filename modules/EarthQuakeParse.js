var http = require('https');
var fs = require('fs')

var obj;
var Earthquakefile="./result/earth.json";
var  Earthquake =function(latitude,longitude,Earthquake){
	this.type ="Earthquake";
	this.Latitude=latitude;
	this.Longitude=longitude;
	this.Magnitude = Earthquake;
}

var DataSort = function(callback){
	
	 obj = JSON.parse(fs.readFileSync(Earthquakefile,'utf8'));
	 	
	for(var i = 0;i<obj.features.length;i++) {
		
	ebj=obj.features[i];
	
    var newdata = new Earthquake(ebj.geometry.coordinates[0],ebj.geometry.coordinates[1],ebj.properties.mag);
	
  result.push(newdata);
  }  
  (callback && typeof(callback) === "function") && callback();
};
	
var download = function(url,dest,ecallback,rb,cb) {
    
  var file = fs.createWriteStream(dest);
  var request = http.get(url,function(response) {
    response.pipe(file);	
    file.on('finish',function() {
		console.log("Earthquakefile download complete")
      file.close(cb); 
	  DataSort(ecallback);
	
	  // close() is async, call cb after close completes.
    });
	 
	 
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb){
		
		cb(err.message);
	}
	
  });

};
	
 module.exports = download;








