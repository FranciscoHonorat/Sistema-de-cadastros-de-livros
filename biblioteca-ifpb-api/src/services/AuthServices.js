const dataSource = require('..database/models');
const Services = require('./Services.js');

class AuthServices extends Services {
    constructor() {
        super('User');
    }

    async buscaPorEmail(email) {
        return dataSource[this.model].findOne({ where: { email }});
    }
}