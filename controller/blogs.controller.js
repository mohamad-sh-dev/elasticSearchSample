
const elasticClinet = require('../config/config.elastic');
let defaultIndexName = 'blog'

async function createBlog(req, res, next) {
    try {
        const { title, author, body } = req.body;
        const result = await elasticClinet.index({
            index: defaultIndexName,
            document: {
                title,
                author,
                body,
            }
        })
        return res.status(201).json({
            status: 'success',
            message: 'blog created',
            data: {}
        })

    } catch (error) {
        next(error)
    }
}
async function updateBlog(req, res, next) {
    try {
        const { id } = req.query;
        const data = req.body
        const updatedBlog = await elasticClinet.update({
            index: defaultIndexName,
            id,
            doc: data
        })
        return res.status(200).json({
            status: 'success',
            message: 'update successfull',
            data: updatedBlog
        })

    } catch (error) {
        next(error)
    }
}
async function removeBlog(req, res, next) {
    try {
        const { id } = req.params;
        const removedBlog = await elasticClinet.deleteByQuery(
            {
                index: defaultIndexName,
                query: {
                    match: {
                        _id: id
                    }
                }
            }
        )
        return res.status(200).json({
            status: 'success',
            message: 'removed successfull',
            data: removedBlog
        })


    } catch (error) {
        next(error)
    }
}
async function getBlogs(req, res, next) {
    try {
        const blogs = await elasticClinet.search({
            index: defaultIndexName,
            q: req.params.value
        })
        console.log(blogs);
        return res.status(200).json({
            status: 'success',
            message: '',
            data: blogs.hits.hits
        })

    } catch (error) {
        next(error)
    }
}
async function searchByTitle(req, res, next) {
    try {
        const { title } = req.query;
        const data = (await elasticClinet.search({
            index: defaultIndexName,
            query: {
                match: {
                    title
                }
            }
        })).hits?.hits;
        return res.status(200).json(
            {
                status: 'success',
                message: '',
                data
            }
        )
    } catch (error) {
        next(error)
    }
}
async function searchMultiField(req, res, next) {
    try {
        const { search } = req.query
        const result = (await elasticClinet.search({
            index: defaultIndexName,
            query: {
                multi_match: {
                    query: search,
                    fields: ['title', 'body']
                },

            }
        })).hits?.hits
        return res.status(200).json({
            status: 'success',
            message: '',
            data: result
        })
    } catch (error) {
        next(error)
    }
}
async function searchByRegexp(req, res, next) {
    try {
        const { regexp } = req.query
        const result = (await elasticClinet.search({
            index: defaultIndexName,
            query: {
                regexp: {
                    title: `.*${regexp}.*`,
                }

            }
        })).hits?.hits
        return res.status(200).json({
            status: 'success',
            message: '',
            data: result
        })
    } catch (error) {
        next(error)
    }
}
async function searchByRegexpMultiField(req, res, next) {
    try {
        const { regexp } = req.query
        const result = (await elasticClinet.search({
            index: defaultIndexName,
            query: {
                bool: {
                    should: [
                        {
                            regexp: { title: `.*${regexp}.*` },

                        },
                        {
                            regexp: { author: `.*${regexp}.*` },

                        },
                        {
                            regexp: { body: `.*${regexp}.*` },
                        },

                    ]
                }

            }
        })).hits?.hits
        return res.status(200).json({
            status: 'success',
            message: '',
            data: result
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createBlog,
    getBlogs,
    searchByTitle,
    removeBlog,
    searchMultiField,
    searchByRegexp,
    searchByRegexpMultiField,
    updateBlog
}