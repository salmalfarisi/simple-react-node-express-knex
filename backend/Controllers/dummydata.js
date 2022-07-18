const { kStringMaxLength } = require('buffer');
const fs = require('fs');
const path = require('path');
var dbConnect = require(path.resolve( __dirname, "../databaseconfig.js" ));
var setdatabase = dbConnect.connections;
const validate = require("./validation.js");
var filelocation = path.resolve( __dirname, "../file/files/" );
var mime = require('mime-types')
var complete_path='';

const get = (request, response) => {
	try {
		setdatabase.transaction(function (trx){
			setdatabase.select('id', 'name', 'qty', 'picture', 'expiredAt', 'isActive').from('products').where('isActive', 1).then((result, err) => 
			{
				if(err)
				{
					response.status(400).send({success:false, message:err})
				}
				response.status(200).send({success:true, data: result})
			});
		});
    } catch (e) {
        response.status(400).send({success:false, data: e.message})
    }
}

const post = (request, response) => {
	try{
		const { name, qty, picture, expiredAt, isActive } = request.body
	
		var validationRule = {
			"name": "required|string",
			"qty": "required|integer",
			"expiredAt": "required",
		}
		
		validate(request.body, validationRule, {}, (err, status) => {
			if (!status) {
				response.status(412)
					.send({
						success: false,
						error: err,
					});
			} else {
				try{
					if(request.files.picture){
						let sampleFile = request.files.picture;
						var checkextension = mime.lookup(sampleFile['name']);
						if(checkextension == 'image/jpeg' || checkextension == 'image/png'){
							getextension = checkextension.replace('image/', '.');
						}
						else{
							response.status(400).send({success:false, "error": {"errors": {"vehicleidentitynumber": ['insert cars photo with jpeg or png as extension picture']}}});
							return false;
						}
						const now = Date.now();
						let filename = 'files-' + now + getextension
						complete_path = filelocation+'/'+filename;
						sampleFile.mv(path.join(complete_path), function (err) {
							if (err){
								response.status(400).send({success:false, message:err})
							}
						});
						insertfile = filename;

						var insertdata = {
							name:name,
							qty:qty,
							picture:insertfile,
							expiredAt:expiredAt,
							isActive:1,
						};

						setdatabase.transaction(function (trx){
							setdatabase('products').insert(insertdata)
							.transacting(trx)
							.then((result, err) => 
							{
								if(err)
								{
									response.status(400).send({success:false, message:err})
								}
								response.status(200).send({success:true, data: insertdata})
							})
							.then(trx.commit)
							.catch(trx.rollback);
						});
					}
					else{
						var insertdata = {
							name:name,
							qty:qty,
							expiredAt:expiredAt,
							isActive:1,
						};

						setdatabase.transaction(function (trx){
							setdatabase('products').insert(insertdata)
							.transacting(trx)
							.then((result, err) => 
							{
								if(err)
								{
									response.status(400).send({success:false, message:err})
								}
								response.status(200).send({success:true, data: insertdata})
							})
							.then(trx.commit)
							.catch(trx.rollback);
						});
					}
				}
				catch (e) {
					var insertdata = {
						name:name,
						qty:qty,
						expiredAt:expiredAt,
						isActive:1,
					};

					setdatabase.transaction(function (trx){
						setdatabase('products').insert(insertdata)
						.transacting(trx)
						.then((result, err) => 
						{
							if(err)
							{
								response.status(400).send({success:false, message:err})
							}
							response.status(200).send({success:true, data: insertdata})
						})
						.then(trx.commit)
						.catch(trx.rollback);
					});
				}		
			}
		});
	} catch (e) {
		response.status(400).send({success:false, data: e.message})
	}
}

const getid = (request, response) => {
	try {
		id = request.params.id;
		setdatabase.transaction(function (trx){
			setdatabase.select('id', 'name', 'qty', 'picture', 'expiredAt', 'isActive').from('products').where('id', id).then((result, err) => 
			{
				if(err)
				{
					response.status(400).send({success:false, message:err})
				}
				let text = new Date(result[0].expiredAt);
				let yyyy = text.getFullYear();
				let mm = text.getMonth() + 1; // Months start at 0!
				let dd = text.getDate();
				//let convertdata = mm + "-" + dd + "-" + yyyy;
				let convertdata = yyyy + "-" + mm + "-" + dd;
				showdata = {
					id:result[0].id,
					name:result[0].name,
					qty:result[0].qty,
					picture:result[0].picture,
					expiredAt:convertdata
				};
				response.status(200).send({success:true, data: showdata})
			});
		});
    } catch (e) {
        response.status(400).send({success:false, data: e.message})
    }
}

const put = (request, response) => {
	try{
		id = request.params.id;
		const { name, qty, picture, expiredAt, isActive } = request.body
	
		var validationRule = {
			"name": "required|string",
			"qty": "required|integer",
			"expiredAt": "required",
		}
		
		validate(request.body, validationRule, {}, (err, status) => {
			if (!status) {
				response.status(412)
					.send({
						success: false,
						error: err,
					});
			} else {
				try{
					if(request.files.picture){
						let sampleFile = request.files.picture;
						var checkextension = mime.lookup(sampleFile['name']);
						if(checkextension == 'image/jpeg' || checkextension == 'image/png'){
							getextension = checkextension.replace('image/', '.');
						}
						else{
							response.status(400).send({success:false, "error": {"errors": {"vehicleidentitynumber": ['insert cars photo with jpeg or png as extension picture']}}});
							return false;
						}
						const now = Date.now();
						let filename = 'files-' + now + getextension
						complete_path = filelocation+'/'+filename;
						sampleFile.mv(path.join(complete_path), function (err) {
							if (err){
								response.status(400).send({success:false, message:err})
							}
						});
						insertfile = filename;
						
						var insertdata = {
							name:name,
							qty:qty,
							picture:insertfile,
							expiredAt:expiredAt,
							isActive:isActive,
						};
					}
				}
				catch (e) {
					var insertdata = {
						name:name,
						qty:qty,
						expiredAt:expiredAt,
						isActive:isActive,
					};
				}		
				
				setdatabase.transaction(function (trx){
					setdatabase('products').update(insertdata).where('id',id)
					.transacting(trx)
					.then((result, err) => 
					{
						if(err)
						{
							response.status(400).send({success:false, message:err})
						}
						response.status(200).send({success:true, data: insertdata})
					})
					.then(trx.commit)
					.catch(trx.rollback);
				});
			}
		});
	} catch (e) {
		response.status(400).send({success:false, data: e.message})
	}
}

const remove = (request, response) => {
	try {
		id = request.params.id;
		setdatabase.transaction(function (trx){
			setdatabase('products').update({isActive:parseInt('0')}).where('id',id)
			.transacting(trx)
			.then((result, err) => 
			{
				if(err)
				{
					response.status(400).send({success:false, message:err})
				}
				response.status(200).send({success:true, data: 'data has been deleted'})
			})
			.then(trx.commit)
			.catch(trx.rollback);
		});
    } catch (e) {
        response.status(400).send({success:false, data: e.message})
    }
}
  
module.exports = {
	get,
	post,
	getid,
	put,
	remove,
}