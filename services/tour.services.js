const Tour = require('../models/Tour');

exports.createTourService = async (data) => {
    const tour = await Tour.create(data);
    return tour;
}

exports.getAllToursService = async (filters, queries) => {
    const tours = await Tour.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const total = await Tour.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);

    return { total, page, tours };
}

exports.getATourService = async (tourId) => {
    const tour = await Tour.findOne({ _id: tourId });

    if (tour.veiw) {
        tour.set({ tour: tour.veiw++ }).save();
    } else {
        tour.set({ veiw: 1 }).save();
    }

    return tour;
}

exports.updateATourService = async (tourId, data) => {
    const result = await Tour.updateOne({ _id: tourId }, { $set: data }, {
        runValidators: true
    })
    return result;
}

exports.getTrendingTourService = async () => {
    const tours = await Tour.find({ veiw: { $exists: true } })
        .sort({ veiw: -1 })
        .limit(3)

    return tours;
}

exports.getCheapestTourService = async () => {
    const tours = await Tour.find({ veiw: { $exists: true } })
        .sort({ veiw: 1 })
        .limit(3)

    return tours;
}
