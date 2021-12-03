const {
  getPosts,
  // addPost,
  updatePost,
  deletePost,
  getPost,
} = require("../../controllers/admin/Posts");

const router = require("express").Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
// router.post("/posts", addPost);
router.patch("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

module.exports = router;
