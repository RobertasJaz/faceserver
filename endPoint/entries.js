const Clarifai = require ( 'clarifai' );

const app = new Clarifai.App({
    apiKey: '1a17490571534861888369fe473bf65d'
   });

const handleApi = (req,res) => {

   app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
   .then(data=>{
       res.json(data);
   })
   .catch(err=>res.status(400).json("eerroorr"))
}

const entriesHandle = (req,res, serverPostgres)=>{
    const {id}= req.body;
    
    serverPostgres("users").where("id", "=" , id)
                    .increment("entries", 1)
                    .returning("entries")
                    .then(entries=>{
                        res.json(entries[0]);
                    })
                    .catch(err=>res.status(400).json("klaida"))

}

module.exports = {
    entriesHandle,
    handleApi
}
