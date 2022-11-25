import File from '../models/File.js'
import Person from '../models/Person.js'
import { changeId } from '../utils/utils.js'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import axios from 'axios'
import fs from 'fs'
// CREATE
export const createFile = async (req, res, next) => {
    const newFile = new File(req.body)
    const personId = req.params.id
    try {
        const savedFile = await newFile.save()
        try {
            await Person.findByIdAndUpdate(personId, {
                $push: { files: savedFile._id }
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedFile)
    } catch (error) {
        next(error)
    }
}
// UPDATE
export const updateFile = async (req, res, next) => {
    try {
        const updatedFile = await File.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json(updatedFile)
    } catch (error) {
        next(error)
    }
}
// DELETE
export const deleteFile = async (req, res, next) => {
    const personId = req.params.personid
    try {
        await File.findByIdAndDelete(req.params.id)
        try {
            await Person.findByIdAndUpdate(personId, {
                $pull: { files: req.params.id }
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json('Hotel has been deleted')
    } catch (error) {
        next(error)
    }
}
// GET
export const getFile = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id)
        res.status(200).json(file)
    } catch (error) {
        next(error)
    }
}
// GET ALL
export const getAllFiles = async (req, res, next) => {
    try {
        const files = await File.find()
        res.status(200).json(changeId(files))
    } catch (error) {
        next(error)
    }
}
// GET ALL
export const getFilesPerson = async (req, res, next) => {
    const personId = req.params.id

    try {
        const person = await Person.findById(personId)
        const list = await Promise.all(person.files.map(fileId => {
            return File.findById(fileId)
        }))
        res.status(200).json(changeId(list))
    } catch (error) {
        next(error)
    }
}

export const getFileDowload = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id)
        const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        // const existingPdfBytes = await axios.get(url)
        const buffer = await fs.readFileSync('./ficha.pdf');
        // const buffer  = JSON.parse(await fs.promises.readFile('./ficha.pdf', 'utf-8'))
        const pdfDoc = await PDFDocument.load(buffer)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        console.log(firstPage);
        const { width, height } = firstPage.getSize()
        firstPage.drawText(file.fullname, {
          x: 5,
          y: height / 2 + 300,
          size: 50,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          rotate: degrees(-45),
        })

        const pdfBytes = await pdfDoc.save()
        

        res.status(200).download(pdfBytes)
    } catch (error) {
        next(error)
    }
}