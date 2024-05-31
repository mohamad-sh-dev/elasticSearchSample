const { createBlog, getBlogs, removeBlog, updateBlog, searchByTitle, searchMultiField, searchByRegexp, searchByRegexpMultiField } = require('../controller/blogs.controller')

const router = require('express').Router()

router.post('/', createBlog);
router.get('/list/:value?', getBlogs);
router.get('/search-title?', searchByTitle);
router.get('/search-multifield?', searchMultiField);
router.get('/search-regexp?', searchByRegexp);
router.get('/search-regexp-multi?', searchByRegexpMultiField);
router.delete('/:id?', removeBlog);
router.put('/:id?', updateBlog);

module.exports = router 