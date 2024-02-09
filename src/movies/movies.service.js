const knex = require("../db/connection")

const mapProperties = require("../utils/map-properties");



function readTheaters (id) {
    return knex("movies_theaters as mv")
        .leftJoin("theaters as t", "t.theater_id", "mv.theater_id")
        .where({ movie_id: id }).select("t.*", "mv.is_showing", "mv.movie_id")
}

function readReviews(id) {
    return knex("reviews as r")
      .join("critics as c", "c.critic_id", "r.critic_id")
      .where({ movie_id: id })
      .select("r.*", "c.*")
      .then((results) => {
        const reviewsWithCritics = results.map((result) => {
          const { critic_id, ...review } = result; // Extract critic_id from the result
          const critic = { critic_id, ...result }; // Create the "critic" object
          delete critic.critic_id; // Remove critic_id from the "critic" object
          return { ...review, critic }; // Combine review and critic into one object
        });
        return reviewsWithCritics;
      });
  }

function read (id) {
    return knex("movies").where({ movie_id: id }).select("*").first()
}

function list (isShowing) {
    if(isShowing) {
        return knex("movies as m")
            .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
            .where({ is_showing: true })
            .distinct("m.*")
    } else {
        return knex("movies").select("*");
    }
}


module.exports = {
    read,
    list,
    readTheaters,
    readReviews,
}