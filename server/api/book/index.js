'use strict';

var express = require('express');
var controller = require('./book.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/add', controller.create);
router.get('/find', controller.find);

router.get('/', controller.index);
router.delete('/:id', controller.delete);
module.exports = router;
