const knex = require('../../db/connection');

const read = (review_id) => {
	const requiredFields = [
		'r.*',
		'c.critic_id',
		'c.preferred_name',
		'c.surname',
		'c.organization_name',
		'c.created_at as c_created_at',
		'c.updated_at as c_updated_at',
	];
	return knex('reviews as r')
		.join('critics as c', { 'c.critic_id': 'r.critic_id' })
		.select(requiredFields)
		.where({ 'r.review_id': review_id })
		.first();
};

module.exports = {
	read,
};
