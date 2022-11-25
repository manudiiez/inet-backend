import mongoose from "mongoose";
const FileSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        sex: {
            type: String,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        pressure: { 
            type: String,
            required: true,
        },
        areaName: {
            type: String,
            required: true,
        },
        manager: {
            type: String,
            required: true,
        },
        manager: {
            type: String,
            required: true,
        },
        diseases: {
            type: String,
            default: 'ninguna',
        },
        blood: {
            type: String,
            required: true,
        },
        observations: {
            type: String
        },

    },
    { timestamps: true }
);


export default mongoose.model('File', FileSchema)