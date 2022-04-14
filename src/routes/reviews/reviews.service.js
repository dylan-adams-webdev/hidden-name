const knex = require('../../db/connection');

const readReviews = (review_id) => {
	return knex('reviews')
		.where({ review_id })
		.first();
};

module.exports = {
	readReviews,
}
