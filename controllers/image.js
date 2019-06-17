const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '7c5c25cee46c4f5594897ef56fc204c4'
});

const handleApiCall = () => (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('error while getting API data'))
}

    
const countEntries = (db) => (req, res) => {
    const { id } = req.body;
    let found = false;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    countEntries,
    handleApiCall
}