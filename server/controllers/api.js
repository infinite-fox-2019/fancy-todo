const axios = require('axios')

class apiController {
    static quote(req, res, next) {
        axios.get('https://quotes.rest/qod')
            .then(({ data: { contents: { quotes } } }) => {
                res.status(200).json(quotes[0])
            }).catch(next);
    }
};

module.exports = apiController