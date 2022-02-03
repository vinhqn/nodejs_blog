const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/f8_education_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect db success");
  } catch (error) {
    console.log("connect db failure ", error);
  }
}

module.exports = { connect };
