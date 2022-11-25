import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    idPersona: {
      type: String,
      required: true,
    },
    idArea: {
      type: String,
      required: true,
    },
    nameArea: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      default: 'paciente'
    },
  },
  { timestamps: true }
);


export default mongoose.model('User', UserSchema)