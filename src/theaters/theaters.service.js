const knex = require("../db/connection")

const reduceProperties = require("../utils/reduce-properties")

const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  });

function list () {
    return knex("theaters as t")
        .join("movies_theaters as mv", "mv.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mv.movie_id")
        .select("t.*", "m.*")
        .then(reduceMovies)
}

module.exports = {
    list
}