const handleRegister=(req,res,serverPostgres,bcrypt,saltRounds)=>{
    const {email, name, password} = req.body

if(!email||!name||!password){
    return res.status(400).json("incorrect form submission")

}

    //bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        //console.log(hash)
    //})
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
    serverPostgres.transaction(trx => {
            trx.insert({hash:hash,
                      email:email
                  })
        
        .into("login")
        .returning("email")
        .then(email=>{
           return trx('users')
          .returning("*")
          .insert({
              email: email[0],
              name:name,  
              joined:new Date()
          })
          .then(user=>{
              res.json(user)
          })
        })

        .then(trx.commit)
        .catch(trx.rollback)
    })
        .catch(err=>res.status(400).json("unable to register"))
      }

      module.exports = {
          handleRegister:handleRegister
      }