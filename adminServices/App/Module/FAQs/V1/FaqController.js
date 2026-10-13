const FaqService = require("./FaqService");
const logger = require("../../../Config/logger.config");
const FaqValidations = require("./FaqValidations");
const utils = require("../../../Utils/Utils");
/////////////--------------------------------//////////////////////////////
// Get All FAQs Controller
///////////////------------------------------//////////////////////////////
getAllFaq = async (req, res, next) => {
  logger.info("get all FAQs controller => list of FAQs");
  try {
    const pc = await FaqService.getAllFaq();
    // console.log("FAQs controller", pc);
    // console.log("zones controller", JSON.parse(pc.data[0].zone_coords));
    res.status(200).json(pc);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
/////////////--------------------------------//////////////////////////////
// Get Active FAQs Controller
///////////////------------------------------//////////////////////////////
getActiveFaq = async (req, res, next) => {
  logger.info("get Active FAQs controller => list of Active FAQs");
  try {
    const pc = await FaqService.getActiveFaq();
    // console.log("FAQs active controller", pc);
    // console.log("zones controller", JSON.parse(pc.data[0].zone_coords));
    res.status(200).json(pc);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/////////////--------------------------------//////////////////////////////
// Add FAQ Controller []
///////////////------------------------------//////////////////////////////
addFaq = async (req, res, next) => {
  logger.info("add FAQ controller => add FAQ");
  try {
    let { question, answer, status, type } = req.body;

    let validateData = await FaqValidations.addValidation.validate(req.body);
    if (validateData && validateData.error) {
      return res.status(422).json({ error: validateData.error.message });
    }
    const pc = await FaqService.addFaq({
      question,
      answer,
      status,
      type
    });
    res.status(200).json(pc);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
/////////////--------------------------------//////////////////////////////
// Update FAQ Controller [validations added]
///////////////------------------------------//////////////////////////////
updateFaqById = async (req, res, next) => {
  logger.info("update FAQ ById controller => update zone");
  try {
    const fid = req.params.id;
    let { question, answer, status, type } = req.body;
    await FaqValidations.idValidate.validateAsync(fid);
    let validateData = await FaqValidations.updateValidation.validate(req.body);
    if (validateData && validateData.error) {
      return res.status(422).json({ error: validateData.error.message });
    }

    // console.log("req body", cityName, zoneCoords);
    const pc = await FaqService.updateFaqById({
      fid,
      question,
      answer,
      status,
      type
    });
    // console.log("add zone controller", pc);
    // console.log("zones controller", JSON.parse(pc.data[0].zone_coords));

    res.status(200).json(pc);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid Url Parameter" });

    next(error);
  }
};
/////////////--------------------------------//////////////////////////////
// Update FAQ Status ById Controller [validations added]
///////////////------------------------------//////////////////////////////
updateFaqStatusById = async (req, res, next) => {
  logger.info("update FAQ Status ById controller => update FAQ Status ById");
  try {
    const fid = req.params.id;
    const Faqstatus = req.params.status;

    await FaqValidations.idValidate.validateAsync(fid);
    await FaqValidations.statusValidate.validateAsync(Faqstatus);

    const statusBoolean = Faqstatus === "true" ? 1 : 0;
    const pc = await FaqService.updateFaqStatusById({
      fid,
      statusBoolean,
    });

    res.status(200).json(pc);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid Url Parameter" });
    next(error);
  }
};
///////////--------------------------------//////////////////////////////
// Delete FAQ ById Controller [validations added]
/////////////------------------------------//////////////////////////////
deleteFaqById = async (req, res, next) => {
  logger.info("Delet faq controller => Delete FAQ");
  try {
    const fid = req.params.id;

    await FaqValidations.idValidate.validateAsync(fid);

    const pc = await FaqService.deleteFaqById({
      fid,
    });

    res.status(200).json(pc);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid Url Parameter" });

    next(error);
  }
};
module.exports = {
  addFaq,
  getAllFaq,
  getActiveFaq,
  updateFaqById,
  updateFaqStatusById,
  deleteFaqById,
};
