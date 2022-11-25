import mongoose from "mongoose";
const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String, 
      required: true,
    },
    dni: {
      type: Number,
      required: true,
    },
    idUser: { 
      type: String,
    },
    files: {
      type: [String],
    },
  },
  { timestamps: true }
);


export default mongoose.model('Person', PersonSchema)