const Tour = require('../models/Tour');

exports.createTourService = async (data) => {

    const tour = await Tour.create(data);
    return tour;
}

exports.getTourService = async (filters, queries) => {

    const tour = await Tour.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const total = await Tour.countDocuments(filters);
    return { tour, total };
}