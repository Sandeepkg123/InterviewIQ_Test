import mongoose from "mongoose"


const questionSchema = new mongoose.Schema({
    question: string,
    difficulty: string,
    timeLimit: number,
    answer: string,
    feedback: string,
    score:{type: Number, default: 0},
    confidence:{type: Number, default: 0},
    communication:{type: Number, default: 0},
    correctness:{type: Number, default: 0},
})


const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
    },
    mode: {
        type: String,
        enum: ["HR", "Technical"],
        required: true,
    },
    resumeText: {
        type: String,
        
    },
    questions: [questionSchema],
    finalScore: {type: Number, default: 0},
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "Incomplete",
    },

}, { timestamps: true });

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;