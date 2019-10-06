const axios = require('axios');


class AnimalController {
    static showAnimal(req,res,next){
        axios({
            method : 'get',
            url : `http://dog.ceo/api/breed/hound/images/random`
        })
            .then(function({data}){
                console.log(data)
                res.status(200).json(data);
            })
            .catch(console.log)
    }
}

module.exports = AnimalController;