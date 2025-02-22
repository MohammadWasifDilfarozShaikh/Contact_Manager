// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json()); // For parsing JSON
// app.use(cors()); // Enable CORS

// // Check if MONGO_URI is set
// if (!process.env.MONGO_URI) {
//     console.error("Error: MONGO_URI is not defined in .env file");
//     process.exit(1);
// }

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB Connected"))
// .catch(err => {
//     console.error("MongoDB Connection Failed:", err);
//     process.exit(1);
// });

// // Sample Schema & Model
// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });

// const User = mongoose.model("User", UserSchema);

// // Routes
// app.get("/users", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.post("/users", async (req, res) => {
//     try {
//         const newUser = new User(req.body);
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
