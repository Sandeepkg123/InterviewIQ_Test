import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { analyzeResume } from '../controller/interview.controller.js'
import { upload } from '../middleware/multer.js'

const interviewRouter = express.Router()

interviewRouter.post('/resume', isAuth, upload.single('resume'), analyzeResume)

export default interviewRouter