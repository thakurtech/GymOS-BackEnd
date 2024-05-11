const express = require("express");
const auth = require("../../middlewares/auth");
const { userController,dietController } = require("../../controllers");

const router = express.Router();

router.put("/update-user", auth(), userController.updateUser);
router.delete("/delete-user", auth(), userController.deleteUser);
router.get("/get-all-users", auth(), userController.getAllUsers);
router.get("/get-user-by-id/:id", auth(), userController.getUserById);
router.get("/fetch-diet/:id",auth(),dietController.fetchDietFunction);
router.post("/create-diet",auth(),dietController.createDietFunction);
router.delete("/delete-diet/:id",auth(),dietController.deleteDietFunction);
router.post("/add-diet",auth(),dietController.addDietFunction);

module.exports = router;
