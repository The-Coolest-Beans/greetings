module.exports = {
	db: {
		name: 'greetingCards',
		user:  'dev',
		host: 'greetings.cs.nmsu.edu',
		port:  3306,
		password: process.env.DB_PASS,
	},

};
