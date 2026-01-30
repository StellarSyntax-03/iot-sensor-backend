require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mqtt = require("mqtt");



const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const sensorRoutes = require("./routes/sensorRoutes");
app.use("/api/sensor", sensorRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});


const Sensor = require("./models/Sensor");

const mqttClient = mqtt.connect("mqtt://broker.hivemq.com");

mqttClient.on("connect", () => {
  console.log("MQTT connected");

  mqttClient.subscribe("iot/sensor/+/temperature");
});

mqttClient.on("message", async (topic, message) => {
  try {
    const parts = topic.split("/");
    const deviceId = parts[2]; 
    const temperature = Number(message.toString());

    if (isNaN(temperature)) return;

    await Sensor.create({
      deviceId,
      temperature,
      timestamp: Date.now()
    });

    console.log(`MQTT data saved: ${deviceId} → ${temperature}`);
  } catch (err) {
    console.error("MQTT error:", err.message);
  }
});
