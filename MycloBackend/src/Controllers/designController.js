const Design = require("../Models/design");

exports.addDesign = async (req, res) => {
  try {
    const design = new Design(req.body);
    await design.save();
    res.status(201).json(design);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDesign = async (req, res) => {
  try {
    const design = await Design.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!design) {
      return res.status(404).json({ error: "Design not found" });
    }
    res.status(200).json(design);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
