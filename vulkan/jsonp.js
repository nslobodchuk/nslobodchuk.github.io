//Making wall.get requests following this guide https://vk.com/dev/api_requests
//The code for JSONP requests taken from "JavaScript: The Definitive Guide, p. 515, example 18-14"

function getJSONP(url, callback) {
var cbnum = "cb" + getJSONP.counter++;
var cbname = "getJSONP." + cbnum;

if (url.indexOf("?") === -1) 
url += "?callback=" + cbname; 
else
url += "&callback=" + cbname; 
var script = document.createElement("script");
getJSONP[cbnum] = function(response) {
try {
callback(response);
}
finally {
delete getJSONP[cbnum]; 
script.parentNode.removeChild(script);
}
};

script.src = url; 
document.body.appendChild(script);
}
getJSONP.counter = 0;