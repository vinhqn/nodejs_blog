// const res = require("express/lib/response");
const Course = require("../models/Course");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class SiteController {
  // [GET] /news
  index(req, res, next) {
    // Course.find({}, function (error, course) {
    //   if (!error) {
    //     res.json(course);
    //     return;
    //   }
    //   res.status(400).json({ error: "Error!" });
    // });

    Course.find({})
      .then((courses) => {
        // res.json(courses);
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch((err) => {
        next(err);
      });

    // res.render("home");
  }

  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
