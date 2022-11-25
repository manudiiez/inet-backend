import User from '../models/User.js'
import Person from '../models/Person.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
/* ---------------------------------- error --------------------------------- */
import { createError } from "../utils/error.js";
import { changeId } from '../utils/utils.js';

// REGISTER
export const registerUser = async (req, res, next) => {
    try {
        const username = await User.findOne({ username: req.body.username })
        const email = await User.findOne({ email: req.body.email })

        if (username || email) {
            return next(createError(404, "Este usuario ya existe, pruebe con otro email o nombre de usuario"))
        }
        if (req.body.password.length < 6) {
            return next(createError(404, "La contraseña es muy corta"))
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = User({
            ...req.body,
            password: hash
        })
        const user = await newUser.save()
        const { password, isAdmin, ...otherDetails } = user._doc

        try {
            await Person.findByIdAndUpdate(req.body.idPersona, { idUser: user._id })
        } catch (error) {
            next(error)
        }
        res.status(200).json({ details: { ...otherDetails }, isAdmin })

    } catch (error) {
        next(error)
    }
}

// LOGIN
export const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, 'Ese usuario no fue encontrado'))

        const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordCorrect) return next(createError(404, "Nombre de usuario o contraseña incorrectos"))

        const token = jwt.sign({ id: user._id, isAdmin: user.rol }, 'secret')

        const { password, ...otherDetails } = user._doc

        res.cookie('access_token', token, {
            httpOnly: true
        })
        res.status(200)
            .json(otherDetails)

    } catch (error) {
        next(error)
    }
}


// UPDATE
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}
// DELETE
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel has been deleted')
        try {
            await Person.findByIdAndDelete(user._id)
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}
// GET
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
// GET ALL
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(changeId(users))
    } catch (error) {
        next(error)
    }
}

const setDoctorData = (userData, personData) => {
    const newObj = userData
    userData['idPersona'] = `${personData.name} ${personData.lastname} | ${personData.dni} | ${userData.rol}`
    userData['id'] = personData._id
    return newObj
}
// GET ALL
export const getAllDoctors = async (req, res, next) => {
    try {
        const users = await User.find({ rol: 'medico' })
        const list = await Promise.all(users.map(async(userData) => {
            const personObj = await Person.findById(userData.idPersona)
            return setDoctorData(userData, personObj)
        }))
        res.status(200).json(changeId(list))
    } catch (error) {
        next(error)
    }
}
