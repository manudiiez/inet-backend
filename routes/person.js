import express from 'express'
import { createPerson, deletePerson, getAllPersons, getPerson, updatePerson } from '../controllers/person.js'

const router = express.Router()

// CREATE
router.post('/', createPerson)
// UPDATE
router.put('/:id', updatePerson)
// DELETE
router.delete('/:id', deletePerson)
// GET
router.get('/:id', getPerson)
// GET ALL
router.get('/', getAllPersons)


export default router