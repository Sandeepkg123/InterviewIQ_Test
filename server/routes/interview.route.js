import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { analyzeResume,submitAnswer,finishInterview ,generateQuestions,} from '../controller/interview.controller.js'
import { upload } from '../middleware/multer.js'

const interviewRouter = express.Router()

interviewRouter.post('/resume', isAuth, upload.single('resume'), analyzeResume)
interviewRouter.post('/generate-questions', isAuth, generateQuestions)
interviewRouter.post('/submit-answers', isAuth, submitAnswer)
interviewRouter.post('/finish', isAuth, finishInterview)

export default interviewRouter