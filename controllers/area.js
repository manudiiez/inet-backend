import Area from '../models/Area.js'
import { changeId } from '../utils/utils.js'


// CREATE
export const createArea = async (req, res, next) => {
    const newArea = new Area(req.body)
    try {
        const savedArea = await newArea.save()
        res.status(200).json(savedArea)
    } catch (error) {
        next(error)
    }
}
// UPDATE
export const updateArea = async (req, res, next) => {
    try {
        const updatedArea = await Area.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json(updatedArea)
    } catch (error) {
        next(error)
    }
}
// DELETE
export const deleteArea = async (req, res, next) => {
    try {
        await Area.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel has been deleted')
    } catch (error) {
        next(error)
    }
}
// GET
export const getArea = async (req, res, next) => {
    try {
        const area = await Area.findById(req.params.id)
        res.status(200).json(area)
    } catch (error) {
        next(error)
    }
}
// GET ALL
export const getAllAreas = async (req, res, next) => {
    try {
        const areas = await Area.find()
        res.status(200).json(changeId(areas))
    } catch (error) {
        next(error)
    }
}