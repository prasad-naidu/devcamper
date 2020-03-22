const express = require('express')

const router =  express.Router()
const { protect } =require("../middleware/auth")

const bootCampController = require("../controllers/controller_bootcamps")
const userController = require("../controllers/auth")
router.route("/").get(protect, bootCampController.getBootcamps)
.post(protect,bootCampController.postBootcamps)
router.get("/me",protect,userController.getMe)

// router.post("/",bootCampController.postBootcamps);
// router.get("/",bootCampController.getBootcamps)
// router.get("/:id",bootCampController.getBootcamp);
// router.put("./:id",bootCampController.updateBootcamps);
// router.delete("./:id",bootCampController.deleteBootcamps);

module.exports=router