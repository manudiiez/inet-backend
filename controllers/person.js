import Person from '../models/Person.js'
import User from '../models/User.js'
import { changeId } from '../utils/utils.js'


// CREATE
export const createPerson = async (req, res, next) => {
    const newPerson = new Person(req.body)
    try {
        const savedPerson = await newPerson.save()
        res.status(200).json(savedPerson)
    } catch (error) {
        next(error)
    }
}
// UPDATE 
export const updatePerson = async (req, res, next) => {
    try {
        const updatedPerson = await Person.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json(updatedPerson)
    } catch (error) {
        next(error)
    }
}
// DELETE
export const deletePerson = async (req, res, next) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id)
        if(person.idUser){
            try {
                await User.findByIdAndDelete(person.idUser)

            } catch (error) {
                next(error)
            }
        }
        res.status(200).json('Eliminado')
    } catch (error) {
        next(error)
    }
}
// GET
export const getPerson = async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id)
        const { _id, ...otherDetails } = person._doc
        res.status(200).json({id: _id, ...otherDetails})
    } catch (error) {
        next(error)
    }
}
// GET ALL
export const getAllPersons = async (req, res, next) => {
    try {
        const persons = await Person.find()
        res.status(200).json(changeId(persons))
    } catch (error) {
        next(error)
    }
}

