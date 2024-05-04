const express = require("express"),
  dotenv = require("dotenv"),
  marketRouter = require("./routes/market");

dotenv.config();

const app = express(),
  port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("", marketRouter);

process.on("SIGINT", () => {
  server.close();
  console.log("\nServer closed.");
  process.exit(0);
});
