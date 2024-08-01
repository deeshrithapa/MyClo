const Measurement = require('../Models/measurement');

exports.addMeasurement = async (req, res) => {
  try {
    const { userId, measurements } = req.body;
    const measurement = new Measurement({ userId, measurements });
    await measurement.save();
    res.status(201).json(measurement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMeasurement = async (req, res) => {
  try {
    const { measurements } = req.body;
    const measurement = await Measurement.findByIdAndUpdate(
      req.params.id,
      { measurements },
      { new: true }
    );
    if (!measurement) {
      return res.status(404).json({ error: 'Measurement not found' });
    }
    res.status(200).json(measurement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.find();
    res.status(200).json(measurements);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMeasurementById = async (req, res) => {
  try {
    const measurement = await Measurement.findById(req.params.id);
    if (!measurement) {
      return res.status(404).json({ error: 'Measurement not found' });
    }
    res.status(200).json(measurement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
