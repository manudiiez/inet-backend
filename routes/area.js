import express from 'express'
import { createArea, deleteArea, getAllAreas, getArea, updateArea } from '../controllers/area.js'

const router = express.Router()

// CREATE
router.post('/', createArea)
// UPDATE
router.put('/:id', updateArea)
// DELETE
router.delete('/:id', deleteArea)
// GET
router.get('/', getAllAreas)
// GET ALL
router.get('/:id', getArea)


export default router