
function notFoundHandler (req, res, next) {
    const { originalUrl } = req
    next({
        status: 404,
        message: `Nothing exists at path: ${originalUrl}!`
    })
}

module.exports = notFoundHandler;