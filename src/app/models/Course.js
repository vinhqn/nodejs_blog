const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema(
  {
    name: { type: String, required: true, maxlength: 255 },
    description: { type: String, maxlength: 600 },
    thumnail: { type: String, maxlength: 255 },
    videoId: { type: String, required: true, maxlength: 255 },
    level: { type: String, maxlength: 255 },
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }
);

// ADD Plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Course", Course);
