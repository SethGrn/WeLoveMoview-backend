const reviewsService = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reviewExists (req, res, next) {
    const { reviewId } = req.params;

    const review = await reviewsService.read(reviewId);

    if (review) {
        res.locals.review = review;
        return next()
    } else {
        next({
            status: 404,
            message: `Review with id: ${reviewId} cannot be found`
        })
    }
}

function read (req, res, next) {
    const { review } = res.locals;
    res.status(200).json({ data: review })
}

async function destroy (req, res, next) {
    const { reviewId } = req.params;

    await reviewsService.delete(reviewId);

    res.sendStatus(204)
}

async function update (req, res, next) {
    const { reviewId } = req.params;
    const { data } = req.body;

    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };

      console.log(updatedReview)

    await reviewsService.update(data, reviewId)

      //await reviewsService.update(updatedReview);

    res.status(200).json({ data: await reviewsService.read(reviewId) })
}

module.exports = {
    read: [asyncErrorBoundary(reviewExists), read],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), destroy],
}