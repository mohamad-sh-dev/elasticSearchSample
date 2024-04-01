const { Client } = require('@elastic/elasticsearch')
const { ELASTIC_HOST, ELASTIC_PASSWORD, ELASTIC_USERNAME } = process.env
module.exports = new Client({
    node: ELASTIC_HOST,
    auth: {
        username: ELASTIC_USERNAME,
        password: ELASTIC_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})