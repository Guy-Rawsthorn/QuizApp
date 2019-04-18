const authResolver = require('./resolvers');

const rootResolver = {
    ...authResolver
};

module.exports = rootResolver;
