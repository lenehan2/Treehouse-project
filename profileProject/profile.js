  

  //Problem: We need a simple way to look at a user's badge count and JavaScript points
  
  //Use node.js to connect to Treehouse's API to get profile information to print out
  
  var https = require("https");
  var http = require("http");
  
  
  //Print out error message
  function printError(error){  
    console.error(error.message);
  };
  
  //Print out message
  function printMessage(username,badgeCount,points){
   var message = username + " has " + badgeCount + " total bades(s) and " + points+ " points in JavaScript.";
  
  console.log(message);
  };
  
  //Connect to the API URL
var get = function(username){    
  var request = https.get("https://teamtreehouse.com/"+username+".json",function(response){
    
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
    var profile = JSON.parse(body);
    //Print the data
    printMessage(username,profile.badges.length,profile.points.JavaScript);
    } catch(error){
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

module.exports.get=get;