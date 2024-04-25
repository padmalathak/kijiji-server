const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const comments = require("./routes/comments");
app.use("/comments", comments);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
