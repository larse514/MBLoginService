var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/*
 * Repository class for Users, currently pulls from file
 */
 
/*
 * Method to store User credentials 
 */
function storeCredentials(user){
	console.log(user);
	//convert the user to json
	var jsonString = user.toJSON();
	//now right the User to the file
	fs.writeFile("/tmp/test.json", JSON.stringify(jsonString), function(err) {
		if(err) {
		    console.log(err);
			return err;
		}

		console.log("The file was saved!");
	}); 
}
/*
 * Method to retriever user from repo
 */
function getUser(){
	try
		//Get repo connection
		var connection = getConnection();
		//grab user and return
		var user = JSON.parse(connection.responseText);
		
		console.log(user);
		return user;
	}
	catch(err){
		console.log("also");

		console.log(err);
	}
}


function getConnection()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "file:///tmp/test.json", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
				//throw "failed to get connection"

            }
        }
    }
    rawFile.send(null);
	return rawFile;

}

module.exports = {
	storeCredentials : storeCredentials,
	getUser : getUser
}