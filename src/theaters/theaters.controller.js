const theatersService = require("./theaters.service")

async function list (req, res, next) {
    res.status(200).json({ data: await theatersService.list() })
}

module.exports = {
    list
}