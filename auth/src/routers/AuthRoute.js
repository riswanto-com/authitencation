const router = require("express").Router();
const controller = require("../app/controllers/AuthController");
router.post("/auth",controller.AuthUser)
router.post("/register",controller.RegisterUser)
router.get("/profil",controller.DataProfil)
module.exports = router;