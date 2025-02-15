/// Mongoose Install
// ConnectDB Funciton using mongoose
//  Connection URL mongoose.connect(URL)
// Schema login:str,requied, password
// Create a model using schema




const http = require('http');
const url = require('url');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/yoga_users";  // Ensure correct URI
const client = new MongoClient(mongoURI);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    }
}

connectDB();
const db = client.db("yoga_users");
const usersCollection = db.collection("users");

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === "POST" && parsedUrl.pathname === "/signin") {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            const { email, password } = JSON.parse(body);

            // Hash password before storing
            const hashedPassword = await bcrypt.hash(password, 10);

            try {
                await usersCollection.insertOne({ email, password: hashedPassword });

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Sign-In Successful", redirect: "main.html" }));
            } catch (error) {
                res.writeHead(400);
                res.end("User already exists or error occurred");
            }
        });
    } else {
        res.writeHead(404);
        res.end("Route not found");
    }
});

server.listen(5000, () => console.log("🚀 Server running on port 5000"));
