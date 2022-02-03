const Course = require("../models/Course");

const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  // [GET] /courses/:slug

  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
    // res.send("COURSES DETAIL - " + req.params.slug);
  }

  store(req, res, next) {
    req.body.thumnail = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => {
        console.log("error ====== ", error);
      });
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  // [GET] /courses/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        console.log(" show edit ====== ", mongooseToObject(course));
        res.render("courses/edit", { course: mongooseToObject(course) });
      })
      .catch((next) => {
        console.log("error show edit ====== ", next);
      });
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    // res.json(req.body);
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => {
        console.log("save error ", error);
        next(error);
      });
  }

  // [DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch((error) => {
        console.log("delete error ", error);
        next(error);
      });
  }

  // [DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch((error) => {
        console.log("delete error ", error);
        next(error);
      });
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch((error) => {
        console.log("restore error ", error);
        next(error);
      });
  }

  // [PATCH] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.params.courseIds } })
          .then((result) => {
            res.redirect("back");
          })
          .catch((error) => {
            console.log("delete error ", error);
            next(error);
          });
        break;

      default:
        res.json({ message: "Action invalid!" });
    }
  }
}

module.exports = new CourseController();
