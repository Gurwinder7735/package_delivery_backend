const {
  getBids,
  // addPost,
  // updatePost,
  deleteBid,
  getBid,
} = require("../../controllers/admin/bids");

const router = require("express").Router();

router.get("/bids", getBids);
router.get("/bids/:id", getBid);
// router.post("/bids", addPost);
// router.patch("/bids/:id", updatePost);
router.delete("/bids/:id", deleteBid);

module.exports = router;
