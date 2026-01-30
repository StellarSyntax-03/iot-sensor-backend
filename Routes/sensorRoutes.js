const express = require("express");
const Sensor = require("../models/Sensor");


const router = express.Router();


router.post("/ingest", async (req, res) => {
try {
const { deviceId, temperature, timestamp } = req.body;


if (!deviceId || temperature === undefined) {
return res.status(400).json({ error: "deviceId and temperature are required" });
}


const sensorData = new Sensor({
deviceId,
temperature,
timestamp: timestamp || Date.now()
});


await sensorData.save();
res.status(201).json({ message: "Data saved successfully" });


} catch (error) {
res.status(500).json({ error: error.message });
}
});


router.get("/:deviceId/latest", async (req, res) => {
try {
const data = await Sensor.findOne({ deviceId: req.params.deviceId })
.sort({ timestamp: -1 });


if (!data) {
return res.status(404).json({ message: "No data found" });
}


res.json(data);
} catch (error) {
res.status(500).json({ error: error.message });
}
});


module.exports = router;