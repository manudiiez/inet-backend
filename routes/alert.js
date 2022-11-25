import express from 'express'
import { createAlert, deleteAlert, getAllAlerts, getAlert, updateAlert, getOriginChart, getAreaChart } from '../controllers/alert.js'

const router = express.Router()

// CREATE
router.post('/', createAlert)
// UPDATE
router.put('/:id', updateAlert)
// DELETE
router.delete('/:id', deleteAlert)
// GET
router.get('/', getAllAlerts)
// GET ALL
router.get('/:id', getAlert)
router.get('/chart/pie', getOriginChart)
router.get('/chart/area', getAreaChart)


export default router