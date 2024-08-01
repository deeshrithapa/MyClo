const Fabric = require("../Models/fabric");

exports.addFabric = async (req, res) => {
  try {
    const fabric = new Fabric(req.body);
    await fabric.save();
    res.status(201).json(fabric);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateFabric = async (req, res) => {
  try {
    const fabric = await Fabric.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fabric) {
      return res.status(404).json({ error: "Fabric not found" });
    }
    res.status(200).json(fabric);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
