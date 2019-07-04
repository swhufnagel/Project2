var models = require('../models');

module.exports = {
    register:  async function(req, res) {
        try {
            var account = await models.create(req.body)
            res.send(account.toJSON)
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use'
            })
        }
    }
};