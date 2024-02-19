const express = require("express");
const multerUpload = require('../middleware/multerConfig')

const UsersController = require("../controllers/users");

const router = express.Router();
router.post("/", UsersController.create);
router.get("/:username", UsersController.getUser);
router.patch("/:username/upload", multerUpload.single('file'), UsersController.uploadImage);
router.patch("/:username/edit-bio", UsersController.editBio);
router.get("/", UsersController.searchUsers)
router.post("/:username/friends", UsersController.addFriend)
router.delete("/:username/friends", UsersController.removeFriend)
router.post("/:username/notifications", UsersController.createNotification)
router.delete("/:username/notifications", UsersController.removeNotification)

module.exports = router;
