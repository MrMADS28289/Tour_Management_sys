const { createTourService, getAllToursService, getATourService, updateATourService, getTrendingTourService, getCheapestTourService } = require("../services/tour.services");

exports.creatTour = async (req, res, next) => {
    try {
        const result = await createTourService(req.body);

        res.status(200).json({
            status: "success",
            message: "Data inserted successfully!",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data insert failed.",
            error: error.message
        })
    }
}

exports.getAllTour = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ["sort", "page", "limit"];

        excludeFields.forEach(field => delete filters[field]);

        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filtersString);
        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * Number(limit);
            queries.skip = skip;
            queries.limit = Number(limit);
        }

        const tours = await getAllToursService(filters, queries);

        res.status(200).json({
            status: "success",
            message: "Data found successfully!",
            data: tours
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data not found!.",
            error: error.message
        })
    }
}

exports.getATour = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Tour.set(view)
        const tour = await getATourService(id);
        // console.log(req.query);

        res.status(200).json({
            status: "success",
            message: "Data found successfully!",
            data: tour
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data not found!.",
            error: error.message
        })
    }
}

exports.updateATour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateATourService(id, req.body);

        if (result.modifiedCount) {
            res.status(200).json({
                status: "success",
                message: "Tour detail update successfully!",
                data: result
            });
        } else {
            res.status(200).json({
                status: "fail",
                message: "tour details update faild.",
                data: result
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Tour update faild!.",
            error: error.message
        })
    }
}

exports.getTrendingTour = async (req, res, next) => {
    try {
        const tours = await getTrendingTourService();

        res.status(200).json({
            status: "success",
            message: "Top veiwed Tour found!",
            data: tours
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Tour found faild!.",
            error: error.message
        })
    }
}

exports.getCheapestTour = async (req, res, next) => {
    try {
        const tours = await getCheapestTourService();

        res.status(200).json({
            status: "success",
            message: "Cheapeast Tour found!",
            data: tours
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Tour found faild!.",
            error: error.message
        })
    }
}