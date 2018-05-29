const configVal = require('./config.json');

module.exports = {
    getDbConnectionString: function () {

        return `mongodb://${configVal.uname}:${configVal.pwd}@ds139690.mlab.com:39690/node_todo`
    }
};