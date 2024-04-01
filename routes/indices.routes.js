const { createIndex, getIndexes } = require('../controller/indicescontroller')

const router = require('express').Router()

router.post('/', createIndex)
router.get('/', getIndexes)

module.exports = router 