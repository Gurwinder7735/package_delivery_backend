const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../../controllers/admin/users");

const router = require("express").Router();

router.get("/users", getUsers);
router.post("/users", addUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
