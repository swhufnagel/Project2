var { userLogin } = require('../models');

module.exports = {
    register:  async function(req, res) {
        try {
            var user = await userLogin.create(req.body)
            res.send(userLogin.toJSON)
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use'
            })
        }
    }
};