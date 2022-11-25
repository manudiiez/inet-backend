import mongoose from "mongoose";
const AlertSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        }, 
        nameArea: {
            type: String,
            required: true,
        }, 
        idArea: {
            type: String,
            required: true,
        }, 
        state: {
            type: String,
            default: 'sin atender'
        },
        startdate: {
            type: Date,
            required: true
        },
        enddate: {
            type: Date
        }
    },
    { timestamps: true }
);


export default mongoose.model('Alert', AlertSchema)