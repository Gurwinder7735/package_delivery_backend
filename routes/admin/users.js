const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../../controllers/admin/users");

const router = require("express").Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", addUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
