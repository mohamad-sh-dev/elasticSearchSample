const elasticClinet = require('../config/config.elastic');

async function createIndex(req, res, next) {
    try {
        const { indexName } = req.body;
        // console.log();
        const craetedIndex = await elasticClinet.indices.create({ index: indexName })
        console.log(craetedIndex);
        return res.json({
            status: 'success',
            message: 'created'
        })
    } catch (error) {
        next(error)
    }
}

async function getIndexes(req, res, next) {
    try {
        let indices = await elasticClinet.indices.getAlias()
        indices = Object.keys(indices).filter(key => !new RegExp(/^\.+/).test(key))
        console.log(indices);
        return res.json({
            status: 'success',
            message: 'created',
            data: indices
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createIndex,
    getIndexes
}