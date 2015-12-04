var http = require('https');
var fs = require('fs');
var Lanslidefile="./result/land.json";

var obj;
var  Landslide =function(latitude,longitude,landslide1){
	this.Disaster ="Landslide";
	this.Latitude=latitude;
	this.Longitude=longitude;
	this.Magnitude=landslide1;
};

var DataSort = function(callback){
	
	 obj = JSON.parse(fs.readFileSync(Lanslidefile,'utf8'));
	
	for(var i = 0;i<obj.length;i++) {
    var newdata = new Landslide(obj[i].latitude,obj[i].longitude,obj[i].landslide1);
  result.push(newdata);
  }  
  
(callback && typeof(callback) === "function") && callback();
};
var download = function(url,dest,callback,cb) {

  var file = fs.createWriteStream(dest);
  var request = http.get(url,function(response) {
    response.pipe(file);	
    file.on('finish',function() {
		console.log("Lanslidefile download complete")
      file.close(cb); 
	  DataSort(callback);
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
	
	






