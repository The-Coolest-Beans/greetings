module.exports = {
	db: {
		name: process.env.DB_NAME || 'greetingCards',
		user: process.env.DB_USER || 'dev',
		host: process.env.DB_HOST || 'greetings.cs.nmsu.edu',
		port: process.env.DB_PORT || 3306,
		password: process.env.DB_PASS,
	},

};
