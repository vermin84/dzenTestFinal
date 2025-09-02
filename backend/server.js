// backend/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// ===========================
// Socket.IO для активных сессий
// ===========================
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let activeSessions = 0;

io.on("connection", (socket) => {
  activeSessions++;
  console.log("New connection. Active sessions:", activeSessions);
  io.emit("activeSessions", activeSessions);

  socket.on("disconnect", () => {
    activeSessions--;
    console.log("Disconnected. Active sessions:", activeSessions);
    io.emit("activeSessions", activeSessions);
  });
});

// ===========================
// Подключение к MySQL
// ===========================
/*const pool = mysql.createPool({
  host: process.env.DB_HOST, //|| "mysql.railway.internal",
  user: process.env.DB_USER, // || "root",
  password: process.env.DB_PASSWORD,// || "DzEOZoNrzVwqtdIplsJYWkwtbZJTMGkJ",
  database: process.env.DB_NAME, // || "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});*/
const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  user: process.env.MYSQLUSER || process.env.DB_USER || "root",
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "root",
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || "testdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ===========================
// Вспомогательная функция для формата продукта
// ===========================
const formatProduct = (p) => ({
  ...p,
  price: [
    { value: Number(p.price_usd || 0), symbol: "USD", isDefault: 1 },
    { value: Number(p.price_uah || 0), symbol: "UAH", isDefault: 0 },
  ],
  guarantee: {
    start: p.guarantee_start || null,
    end: p.guarantee_end || null,
  },
});

// ===========================
// REST API
// ===========================

// Проверка сервера
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Получить все продукты
app.get("/products", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products ORDER BY id");
    res.json(rows.map(formatProduct));
  } catch (err) {
    console.error("Error fetching products:", err.code, err.sqlMessage);
    res.status(500).json({ error: err.message });
  }
});

// Получить все заказы
app.get("/orders", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM orders ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching orders:", err.code, err.sqlMessage);
    res.status(500).json({ error: err.message });
  }
});

// Получить заказы с вложенными продуктами
app.get("/orders-with-products", async (req, res) => {
  try {
    const [orders] = await pool.query("SELECT * FROM orders ORDER BY id");
    const [products] = await pool.query("SELECT * FROM products ORDER BY id");

    const result = orders.map(order => ({
      ...order,
      products: products
        .filter(p => p.order_id === order.id)
        .map(formatProduct),
    }));

    res.json(result);
  } catch (err) {
    console.error("Error fetching orders with products:", err.code, err.sqlMessage);
    res.status(500).json({ error: err.message });
  }
});

// ===========================
// Запуск сервера
// ===========================
const PORT = process.env.PORT || 3000; // берем порт из Railway или 3000 локально

server.listen(PORT, async () => {
  try {
    // pool должен быть настроен через DATABASE_URL или другие env переменные
    await pool.query("SELECT 1");
    console.log(`✅ Server started on port ${PORT} and connected to MySQL`);
  } catch (err) {
    console.error("❌ Failed to connect to MySQL:", err.code, err.sqlMessage);
  }
});
