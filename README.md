# IoT Sensor Backend 

This project is a Node.js backend service built as part of an internship pre‑assessment. The goal is to simulate how IoT temperature sensors send data to a backend, how that data is stored in a database,
and how it can be retrieved using APIs.



##  What This Project Does

* Accepts temperature readings from IoT sensors using a REST API
* Stores sensor data in **MongoDB Atlas ( a cloud database)**
* Returns the **latest temperature reading** for any sensor
* Listens to **MQTT messages** from sensors and stores them automatically

---

##  Tech Stack Used

* **Node.js (18+)** – Backend runtime
* **Express.js** – API framework
* **MongoDB Atlas** – Cloud database
* **Mongoose** – MongoDB ODM
* **MQTT (mqtt npm package)** – IoT message subscription
* **Thunder Client** – API testing (VS Code extension)

---

##  Project Structure

```
iot-sensor-backend
 ├─ server.js              # Main server file
 ├─ .env                   # Environment variables 
 ├─ models/
 │   └─ Sensor.js           # Mongoose schema
 ├─ routes/
 │   └─ sensorRoutes.js    # API routes
 ├─ package.json
 └─ README.md
```

---

##  Setup Instructions (Step-by-Step)

### 1. Clone the Repository

```bash
git clone https://github.com/StellarSyntax-03/iot-sensor-backend.git
cd iot-sensor-backend
```

---

### 2️. Install Dependencies

```bash
npm install
```

---

### 3️. Setup MongoDB Atlas

1. Create a **free MongoDB Atlas (M0)** cluster
2. Create a **database user** with read/write access
3. Allow IP access: `0.0.0.0/0`
4. Copy the connection string

---

### 4️. Create `.env` File

Create a `.env` file in the project root:

```
MONGO_URI=mongodb+srv://demonslayergiyu4556_db_user:whiXHoLG3q3IfPyj@cluster0.ucf5si0.mongodb.net/?appName=Cluster0

PORT=3000
```



### 5. Run the Server

```bash
npx nodemon server.js
```

If setup is correct, you will see:

```
MongoDB connected
Server running on port 3000
MQTT connected
```

---

##  REST API Endpoints - Tested on Thuner Client(VS Code Extension)

###  POST `/api/sensor/ingest`

Used to ingest temperature data from sensors.
 POST request with JSON body for ingestion


**Request Body (JSON):**

```json
{
  "deviceId": "sensor-01",
  "temperature": 32.5
}
```



**Success Response:**

```json
{
  "message": "Data saved successfully"
}
```
<img width="1481" height="1000" alt="image" src="https://github.com/user-attachments/assets/84213b17-7d5d-40bc-b4ab-83dfff7ff61a" />


---

###  GET `/api/sensor/:deviceId/latest`

GET request to fetch latest sensor data
Returns the **latest temperature reading** for a given device.

**Example Request:**

```
GET /api/sensor/sensor-01/latest
```

**Response:**

```json
{
  "deviceId": "sensor-01",
  "temperature": 32.5,
  "timestamp": 1705xxxx,
  "createdAt": "2026-..."
}
```
<img width="1919" height="657" alt="image" src="https://github.com/user-attachments/assets/d3a3ab5c-3e39-4401-8e7b-7f48177e674a" />


---

##  Validation testing for missing fields

* `deviceId` and `temperature` are mandatory

<img width="1918" height="619" alt="image" src="https://github.com/user-attachments/assets/61351373-22ea-4421-a0dc-9979454c7011" />

## Timestamp Default 

* No Timestamp specified initially -

<img width="1482" height="537" alt="image" src="https://github.com/user-attachments/assets/c8f2fd18-ca46-429d-8446-32ab2c3f85b1" /> 
  
* Timestamp specified -

<img width="1475" height="972" alt="image" src="https://github.com/user-attachments/assets/2ac20047-159a-4de1-818b-488d35361a95" />


##  MQTT Integration

### 🔹 What Was Implemented

The backend subscribes to the MQTT topic:

```
iot/sensor/+/temperature
```

This allows the server to listen to temperature messages from **any sensor device**.

---

### 🔹 Example MQTT Message

**Topic:**

```
iot/sensor/sensor-99/temperature
```

**Message:**

```
38.4
```

---
###  How It Works

* The server connects to a public MQTT broker (`https://www.hivemq.com/demos/websocket-client/`)
* Extracts `deviceId` from the topic
* Parses temperature value from the message
* Stores the data in MongoDB with current timestamp

The data inserted via MQTT can be fetched using the same REST API.
<img width="1912" height="636" alt="image" src="https://github.com/user-attachments/assets/3cea6363-5b97-44fe-9a11-a48f06b4d193" />


<img width="1600" height="718" alt="image" src="https://github.com/user-attachments/assets/479fe597-bb8c-4ced-a4a7-fc6d65b321b5" />

---
MongoDB Data Collected -
<img width="1507" height="831" alt="image" src="https://github.com/user-attachments/assets/c04723f5-5d89-4ae9-9b9d-36bb82ca2e07" />

## Assignment Requirements Covered

| Requirement               | Status |
| ------------------------- | ------ |
| POST API                  | ✅      |
| GET Latest API            | ✅      |
| MongoDB Atlas Integration | ✅      |
| Validation                | ✅      |
| Timestamp Default         | ✅      |
| MQTT Subscriber           | ✅      |
| Documentation             | ✅      |

---

##  Author

Mayuresh Thakur
Internship Candidate

---

##  Final Note

This poject demonstrates backend fundamentals, database integration, and IoT message handling. Thank You for giving me this opportunity and it was an good experience for me in buiding 
this task. Looking forward to contributing ahead to this role and building more real world projects and making a impact.
