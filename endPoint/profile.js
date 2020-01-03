const handleProfileGet = (req,res, serverPostgres)=>{
    const {id}= req.params;
    

    serverPostgres.select("*").from("users").where({id:id})
    .then(user=>{
        if(user.length){
            res.json(user[0])
}   else {
    res.status(4000).json("Not found")
}
        })
    .catch(err=>res.status(4000).json("error"))

}

module.exports = {
    handleProfileGet:handleProfileGet
}