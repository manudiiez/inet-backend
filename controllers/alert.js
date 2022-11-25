import Alert from '../models/Alert.js'
import Area from '../models/Area.js'

import { changeId } from '../utils/utils.js'


// CREATE
export const createAlert = async (req, res, next) => {
    const newAlert = new Alert(req.body)
    try {
        const savedAlert = await newAlert.save()
        res.status(200).json(savedAlert)
    } catch (error) {
        next(error)
    }
}
// UPDATE
export const updateAlert = async (req, res, next) => {
    try {
        const updatedAlert = await Alert.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json(updatedAlert)
    } catch (error) {
        next(error)
    }
}
// DELETE
export const deleteAlert = async (req, res, next) => {
    try {
        await Alert.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel has been deleted')
    } catch (error) {
        next(error)
    }
}
// GET
export const getAlert = async (req, res, next) => {
    try {
        const alert = await Alert.findById(req.params.id)
        res.status(200).json(alert)
    } catch (error) {
        next(error)
    }
}
// GET ALL
export const getAllAlerts = async (req, res, next) => {
    try {
        const alerts = await Alert.find()
        res.status(200).json(changeId(alerts))
    } catch (error) {
        next(error)
    }
}


export const getOriginChart = async (req, res, next) => {
    try {
        const countType1 = await Alert.find({ origin: 'baño' }).count()
        const countType2 = await Alert.find({ origin: 'cama' }).count()
        const arr = [
            {
                label: '# of Votes',
                data: [countType1, countType2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            }
        ]
        res.status(200).json(arr)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const getAreaChart = async (req, res, next) => {
    try {
        const areas = await Area.find()
        try {
            const list = await Promise.all(areas.map(async (area) => {
                const countType1 = await Alert.find({ idArea: area._id }).count()
                const newItem = {
                    label: area.name,
                    data: [countType1],
                    backgroundColor: randomRGB()
                }
                return newItem
            }))

            res.status(200).json(list)

        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

const randomRGB = () => {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    const RGBColor = "rgb(" + x + "," + y + "," + z + ")";
    return RGBColor
}