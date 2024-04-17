const Store = require("../models/store.js")

function getAll(req, res, next){
    Store.find({})
        .then((store)=>{
            res.status(200).json(store);
        })
        .catch((err)=>{
            res.status(500).json([])
        })
}

module.exports = {
    getAll
}
