const { createTourService, getTourService } = require("../services/tour.services");


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

exports.getTour = async (req, res, next) => {
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

        const tours = await getTourService(filters, queries);

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