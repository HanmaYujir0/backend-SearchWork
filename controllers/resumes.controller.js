const Resume = require("../models/Resume.model");

module.exports.resumesController = {
  getResume: async (req, res) => {
    try {
      const resume = await Resume.find()
        .populate("userId")
        .populate("categoryId");
      res.json(resume);
    } catch (e) {
      res.json(e.message);
    }
  },
  getByCategories: async (req, res) => {
    try {
      const resume = await Resume.find({ categoryId: req.params.id })
        .populate("categoryId")
        .populate("userId");
      res.json(resume);
    } catch (e) {
      res.json(e.message);
    }
  },
  postResume: async (req, res) => {
    try {
      const resume = await Resume.create({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        image: req.file.path,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        userId: req.user.id,
        position: req.body.position,
        experience: req.body.experience,
        categoryId: JSON.parse(req.body.categoryId),
      });

      // // const resp = await Resume.findById(resume._id)
      // const update = await Resume.find({ _id: resume._id }).update({
      //   categoryId: req.body.categoryId,
      // });
      return res.json(resume);
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
  patchResume: async (req, res) => {
    try {
      const resume = await Resume.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            categoryId: req.body.categoryId,
          },
        },
        { new: true }
      );

      res.json(resume);
    } catch (e) {
      res.json({ error: e.message });
    }
  },
  deleteResume: async (req, res) => {
    try {
      await Resume.findByIdAndRemove(req.params.id);
      res.json("Резюме удалено");
    } catch (e) {
      res.json(e.message);
    }
  },
};
