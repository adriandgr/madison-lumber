const authResolver = require('./auth');
const millsResolver = require('./mills');

const rootResolver = {
    ...authResolver,
    ...millsResolver,
};

module.exports = rootResolver;
