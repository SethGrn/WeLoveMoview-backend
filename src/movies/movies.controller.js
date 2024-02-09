const moviesService = require("./movies.service")

const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    pregerred_name: "critic.preffered_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
})

async function movieExists(req, res, next) {
    const { movieId } = req.params;

    const movie = await moviesService.read(movieId)

    if(movie) {
        res.locals.movie = movie;
        return next()
    } else {
        next({
            status: 404,
            message: `Movie with id: ${movieId} does not exists`
        })
    }
}

async function readTheaters(req, res, next) {
    const { movieId } = req.params;
    
    res.status(200).json({ data: await moviesService.readTheaters(movieId) })
}

async function readReviews(req, res, next) {
    const { movieId } = req.params;

    res.status(200).json({ data: await moviesService.readReviews(movieId) })
}

function read(req, res, next) {
    const { movie } = res.locals;
    res.status(200).json({ data: movie })
}

async function list(req, res, next) {
    const { is_showing } = req.query;

    res.status(200).json({ data: await moviesService.list(is_showing) })
}

module.exports = {
    read: [movieExists, read],
    list,
    readTheaters,
    readReviews,
}