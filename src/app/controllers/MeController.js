const Course = require("../models/Course");

const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class MeController {
  // [GET] /me/store/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}).sortable(req), Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        console.log("courses == ", courses);
        res.render("me/stored-courses", {
          courses: multipleMongooseToObject(courses),
          deletedCount: deletedCount,
        });
      })
      .catch(next);
  }
  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
