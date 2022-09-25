const mongoose = require('mongoose');

// Schema design
const tourSchema = mongoose.Schema({
    place: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 2,
        maxLength: 100
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: 'Quantity must be an integer.'
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}"
        }
    },
    veiw: {
        type: Number,
        value: 0
    },
    // host: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "hoster"
    // },
    // categories: {
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }

}, {
    timestams: true
})

// mongoos midlewar for saving data: pre / post
tourSchema.pre('save', function (next) {
    if (this.quantity === 0) {
        this.status = "out-of-stock"
    }

    next();
})

// tourSchema.post('save', function (doc, next) {
//     console.log('After save data');

//     next();
// })

// Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;