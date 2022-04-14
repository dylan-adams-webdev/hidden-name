const service = require('./reviews.service');
const asyncErrorBoundary = require('../../errors/asyncErrorBoundary');

const itemExists = async (req, res, next) => {
	const { reviewId } = req.params;
	const review = await service.readReviews(reviewId);
	if (review) {
		res.locals.review = review;
		return next();
	}
	next({ status: 404, message: `review with id ${reviewId} does not exist` });
};

const update = (req, res, next) => {
	const { review } = res.locals;
	const { data: { id, ...rest } = {} } = req.body;
	let updatedReview = {
		...review,
		...rest,
	};
	res.json({ data: updatedReview });
};

const concatCriticAndReview = async (req, res) => {
	
}

module.exports = {
	update: [asyncErrorBoundary(itemExists), asyncErrorBoundary(update)],
	//delete: [asyncErrorBoundary(itemExists), asyncErrorBoundary(destroy)],
};
