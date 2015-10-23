  

  //Problem: We need a simple way to look at a user's badge count and JavaScript points
  
  //Use node.js to connect to Treehouse's API to get profile information to print out
  
  var https = require("https");
  var http = require("http");
  
  
  //Print out error message
  function printError(error){  
    console.error(error.message);
  };
  
  //Print out message
  function printMessage(name,zipcode,temp){
   var message = "The temperature in " +name+ " ("+ zipcode +") is " + temp+ " degrees fahrenheit.";
  
  console.log(message);
  };
  
  //Connect to the API URL
var getWeather = function(zipcode){    
  var request = http.get("http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&units=imperial&appid=703e1298fcc8525313db3b37a16e5d55",function(response){
    
    //console.dir(response.statusCode);
  
  var body = "";
  
  //Read the data
  response.on('data', function (chunk) {
    body+= chunk;
  });
  
  response.on('end',function(){
    if(response.statusCode === 200){
    try{
    //Parse the data
    var weather = JSON.parse(body);
    if(weather.name === undefined){
      console.error(weather.message);
    }else{
    //Print the data
    
     printMessage(weather.name,zipcode,weather.main.temp);
    }} catch(error){
     //parse Error
      printError(error);
    };
    }else{
      printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
    };
  });
  });
  
   //Connection error
  request.on("error", printError);
};

module.exports.getWeather=getWeather;