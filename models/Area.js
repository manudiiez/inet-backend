import mongoose from "mongoose";
const AreaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);


export default mongoose.model('Area', AreaSchema)