const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

// Middleware
app.use(express.json());
app.use(cors());

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

// SCHEMA --> MODEL --> QUERY

// Model
const Tour = mongoose.model('Tour', tourSchema);

// Query
app.post('/api/v1/tour', async (req, res, next) => {
    try {
        const tour = new Tour(req.body)
        const result = await tour.save();

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
})

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

module.exports = app;