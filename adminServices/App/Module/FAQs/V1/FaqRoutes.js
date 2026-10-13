const controller = require("./FaqController");
const commonValidator = require("../../../Validator/commonValidator");
// const { logRequestResponse } = require("../../../Utils/LogReqResMiddleware");
const express = require("express");
const router = express.Router();

router.get(
  "/getAllFaq",
  commonValidator.validateJWTToken,

  controller.getAllFaq
);
router.get(
  "/getActiveFaq",
  commonValidator.validateJWTToken,

  controller.getActiveFaq
);
router.post("/addFaq",
  commonValidator.validateJWTToken,
 
  controller.addFaq
);
router.put(
  "/updateFaqById/:id",
  commonValidator.validateJWTToken,

  controller.updateFaqById
);
router.put(
  "/updateFaqStatusById/:id/:status",
  commonValidator.validateJWTToken,

  controller.updateFaqStatusById
);
router.delete(
  "/deleteFaqById/:id",
  commonValidator.validateJWTToken,
  controller.deleteFaqById
);

module.exports = router;
