const Discount = require("../Models/discount");

exports.addDiscount = async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json(discount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!discount) {
      return res.status(404).json({ error: "Discount not found" });
    }
    res.status(200).json(discount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
