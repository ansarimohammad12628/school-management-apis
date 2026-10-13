const controller = require ("./AdminController");
const commonValidator = require ("../../../Validator/commonValidator")
const express = require ("express");
const router = express.Router();



router.get(
    "/getAllUsers",
    // commonValidator.validateJWTToken,
    controller.getAllUsers

)

router.get(
  "/getUserById/:id",
//   commonValidator.validateJWTToken,
  controller.getUserById
);

router.get(
  "/getUserStatusById/:id",
//   commonValidator.validateJWTToken,
  controller.getUserStatusById
);

module.exports = router;