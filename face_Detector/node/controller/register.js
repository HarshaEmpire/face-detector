

const handleRegister = (req,res,db,bcrypt)=>{
	const {email,name,password}=req.body;
	if(!email || !name || !password){
		return res.status(400).json("incorrect password or email");
	}
	const hash=bcrypt.hashSync(password);
		db.transaction(trx => {
			db("login").transacting(trx).insert({
				hash:hash,
				email:email
			}).
			returning('email').
			then(loginemail =>{
				return trx('users')
				.returning("*")
				.insert({
				email:loginemail[0],
				name:name,
				joined:new Date()
				})
				.then(rest => {
				res.json(rest[0]);
				})
			})
			.then(trx.commit)
			.catch(trx.rollback);
		})
		.catch(err => res.status(400).json("error"));
		
	}
	module.exports = {
		handleRegister:handleRegister
	};