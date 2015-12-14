var http = require('https');
var fs = require('fs')

var obj;
var Earthquakefile="./result/earth.json";
var  Earthquake =function(latitude,longitude,Earthquake){
	this.Disaster ="Earthquake";
	this.Latitude=longitude;
	this.Longitude=latitude;

	if(Number(Earthquake) > 7){
		this.Magnitude = "Extra Large";
	}else if(Number(Earthquake) > 5){
		this.Magnitude = "Very_large";
	}else if(Number(Earthquake) > 4){
		this.Magnitude = "Large";
	}else if(Number(Earthquake) > 3){
		this.Magnitude = "Medium";
	}else if(Number(Earthquake) > 2){
		this.Magnitude = "Small";
	}else{
		this.Magnitude = "never";
	}

	
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








