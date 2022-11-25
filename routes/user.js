import express from 'express'
import { deleteUser, getAllDoctors, getAllUsers, getUser, loginUser, registerUser, updateUser } from '../controllers/user.js'

const router = express.Router()

// REGISTER
router.post('/register', registerUser)
// LOGIN
router.post('/login', loginUser)
// UPDATE
router.put('/:id', updateUser)
// DELETE
router.delete('/:id', deleteUser)
// GET
router.get('/:id', getUser)
// GET ALL
router.get('/', getAllUsers)
router.get('/get/medico', getAllDoctors)



export default router