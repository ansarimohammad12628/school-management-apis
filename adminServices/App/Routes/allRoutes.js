const express = require("express");
const router = express.Router();

const FAQRoutesV1 = require("../Module/FAQs/V1/FaqRoutes");
const UsersRoutesV1 = require ("../Module/Users/V1/AdminRoutes")


router.use("/V1",FAQRoutesV1);
router.use("/V1", UsersRoutesV1)

module.exports = router ;