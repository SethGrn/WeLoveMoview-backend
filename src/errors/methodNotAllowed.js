
function methodNotAllowed (req, res, next) {
    const { method } = req;
    const url = req.originalURL;

    next({
        status: 405,
        message: `Method '${method}' not allowed on ${url}`
    })
}

module.exports = methodNotAllowed;