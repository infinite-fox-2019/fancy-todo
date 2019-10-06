const axios = require('axios')
const apiGiphy = process.env.API_KEY_GIPHY

class ApiController {
    static randomJoke(req, res, next){
        axios({
            method : 'get',
            url: 'https://icanhazdadjoke.com/',
            headers : {
                Accept : 'application/json'
            }
        })
        .then(result =>{
            return axios({
                method: 'get',
                url: `https://api.giphy.com/v1/gifs/random?api_key=${apiGiphy}&tag=laugh&rating=PG-13`
            })
            .then(giphy =>{
                res.status(200).json({
                    gif: giphy.data.data.images.fixed_height.url,
                    joke : result.data.joke
                })
            })
            .catch(next)
        })
    }
}
module.exports = ApiController