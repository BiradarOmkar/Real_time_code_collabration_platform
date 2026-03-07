import mongoose from 'mongoose'

const connectDB=async()=>{
   await mongoose
   .connect('mongodb+srv://omkarbiradar266:Omkar%409608@cluster0.fs94i.mongodb.net/interview-platform?retryWrites=true&w=majority')
}
export default connectDB;