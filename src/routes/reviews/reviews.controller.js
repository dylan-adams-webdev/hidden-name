const service = require('./reviews.service');
const asyncErrorBoundary = require('../../errors/asyncErrorBoundary');

const reduceReviewAndCritic = reduceProperties('review_id', {
	theater_id: ['theater', 'theater_id'],
	name: ['theater', 'name'],
	movie_id: ['movies', null, 'movie_id'],
	title: ['movies', null, 'title'],
	rating: ['movies', null, 'rating'],
});

const itemExists = async (req, res, next) => {
	const { reviewId } = req.params;
	const review = await service.read(reviewId);
	if (review) {
		res.locals.review = review;
		return next();
	}
	next({ status: 404, message: `review with id ${reviewId} does not exist` });
};

const update = async (req, res) => {
	const { review } = res.locals;
	const { data: { id, ...rest } = {} } = req.body;
	const updatedReview = {
		...review,
		...rest,
	};
	res.json({ data: updatedReview });
};

module.exports = {
	update: [asyncErrorBoundary(itemExists), asyncErrorBoundary(update)],
	//delete: [asyncErrorBoundary(itemExists), asyncErrorBoundary(destroy)],
};
