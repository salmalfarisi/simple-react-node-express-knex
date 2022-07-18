var path = require('path');
//var mongoUtil = require( 'mongoUtil' );
var mongoUtil = require(path.resolve( __dirname, "./databaseconfig.js" ));
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// get config vars
dotenv.config();

// access config var
const APP_KEY = process.env.TOKEN_SECRET;

// Set access token via Controller only
const generateAccessToken = (request) => {
	let token;
	if(parseInt(request.statusakun) == parseInt("1")){
		token = jwt.sign({username:request.username}, APP_KEY, { expiresIn: '6h' });
	}
	else{
		token = jwt.sign({username:request.username}, APP_KEY, { expiresIn: '3h' });		
	}
	if(token){
		//return token
		// output => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlcyIsImlhdCI6MTY0NDgxNDM3NCwiZXhwIjoxNjQ0ODI1MTc0fQ.6e6eiSioD2hcYbuT8YDzoTYlCE_2Iao6Qo8qiWR5glQ
		return token;
	}
	else{
		return {success:false, message:"error while create token. please try again"};
	}
	response.end();
}

// Check access token via Controller only
const authenticateToken = (request, response) => {
	try{
		const result = jwt.verify(request.token.split(' ')[1], APP_KEY);
		/*
			// output => { username: 'tes', iat: 1644755945, exp: 1644759545 }
		*/
		return true;
	}catch(e){
		response.status(401).send({success:false, message:"Unauthorized"})
	}
}

// Check access token via Controller only
//masih salah!!
const authenticateAccount = (request, response) => {
	//get data true from mongoUtil
	// cara dapet data darisini!!
	//improve ajalah!!
	const result = jwt.verify(request.token.split(' ')[1], APP_KEY);
	/*
		// output => { username: 'tes', iat: 1644755945, exp: 1644759545 }
	*/
	var different = parseInt(result.exp) - parseInt(result.iat);
	if(different == 21600){
		return true;
	}else{
		return false;
	}
	//10800 untuk user biasa
}

// Get access token via URL
const getAccessToken = (request, response) => {
	const { username, password } = request.body
	mongoUtil.connectToServer( 
		function( err, client ){
			if (err){
				response.status(400).send({success:false, message: err})
			};
			var datas = mongoUtil.getRentGo();
			try {
				datas.collection("user").count({ 'username':username, 'dltstatus':parseInt('0') }, (err, total) => {
					if(total === parseInt('0')){
						response.status(400).send({success:false, message:'username not found'});
					}
					else if(total > parseInt('1')){
						response.status(400).send({success:false, message:'error while login into Rent&Go App'});
					}
					else{
						datas.collection('user').findOne({ 'username':username, 'dltstatus':parseInt('0') }).then((result) => {
							if(err)
							{
								response.status(400).send({success:false, message:err})
							}
							
							getresult = bcrypt.compareSync(password, result.password)
							if(getresult == true){
								try{
									const checktoken = jwt.verify(request.token.split(' ')[1], APP_KEY);
									response.status(200).send({success:true, token: request.token.split(' ')[1]})
								}catch(e){
									let token = jwt.sign({username:username}, APP_KEY, { expiresIn: '3h' });
									if(token){
										response.status(200).send({success:true, token:token});
									}
									else{
										response.status(400).send({success:false, message:"error while create token. please try again"});
									}
								}
							}
							else{
								response.status(400).send({success:false, message:'username or password not match in database'});
							}
						});						
					}
				});
			}
			catch (e) {
				response.status(400).send({success:false, message: e.message})
			}
		}
	);
	response.end();
}

module.exports = {
	generateAccessToken,
	authenticateToken,
	getAccessToken,
	authenticateAccount,
}