const express = require("express");
const fs = require("fs");
const router = express.Router();

const readCommentsData = () => {
  const commentsData = fs.readFileSync("./data/comments.json");
  return JSON.parse(commentsData);
};

router
  .route("/")
  .get((_req, res) => {
    const comments = readCommentsData();
    res.json(comments);
  })
  .post((req, res) => {
    try {
      const comments = readCommentsData();
      const { name, comment } = req.body;
      const newComment = {
        name: name,
        comment: comment,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        likes: 0,
      };
      comments.push(newComment);
      fs.writeFileSync("./data/comments.json", JSON.stringify(comments));
      res.json(newComment);
    } catch (error) {
      res.status(400).send(`Couldnt update comments: ${error}`);
    }
  });

module.exports = router;
