require("dotenv").config()

const {GoogleGenAI}= require ("@google/genai")

const aimodel= new GoogleGenAI(process.env.GEMINI_API_KEY)

module.exports=aimodel