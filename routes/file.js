import express from 'express'
import { createFile, deleteFile, getAllFiles, getFile, getFileDowload, getFilesPerson, updateFile } from '../controllers/file.js'

const router = express.Router()

// CREATE
router.post('/:id', createFile)
// UPDATE
router.put('/:id', updateFile)
// DELETE
router.delete('/:id', deleteFile)
// GET
router.get('/:id', getFile)
// GET ALL
router.get('/', getAllFiles)
router.get('/person/:id', getFilesPerson)
router.get('/file/:id', getFileDowload)


export default router 