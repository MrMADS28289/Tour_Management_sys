const express = require("express");
const router = express.Router();
const tourController = require('../../controllers/tour.controller');

router.route('/')
    .post(tourController.creatTour)
    .get(tourController.getAllTour)

router.route('/trending')
    .get(tourController.getTrendingTour)

router.route('/cheapest')
    .get(tourController.getCheapestTour)


router.route('/:id')
    .get(tourController.getATour)
    .patch(tourController.updateATour)

module.exports = router;