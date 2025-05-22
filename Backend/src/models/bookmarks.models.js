import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  favicon: {
    type: String
  },
  summary :  {
    type : String
  }
}, {
  timestamps: true
});

export const Bookmarks =  mongoose.model("Bookmark", bookmarkSchema);
