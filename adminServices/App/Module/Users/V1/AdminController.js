const logger = require("../../../Config/logger.config");
const UserService = require("./AdminService");
const AdminValidations = require("./AdminValidations");

/////////////--------------------------------//////////////////////////////
// GET All User Controllers
/////////////--------------------------------//////////////////////////////

const getAllUsers = async (req, res, next) => {
  logger.info("get all Users controller => list of Users");
  try {
    const user = await UserService.getAllUsers();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/////////////--------------------------------//////////////////////////////
// Get User ById Controller
///////////////------------------------------//////////////////////////////

const getUserById = async (req, res, next) => {
  logger.info("get User ById controller => get User");

  try {
    const uid = req.params.id;

    await AdminValidations.idValidate.validateAsync(uid);

    const user = await UserService.getUserById({
      uid,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Url Parameter",
    });

    next(error);
  }
};

/////////////--------------------------------//////////////////////////////
// Get User Status ById Controller
///////////////------------------------------//////////////////////////////
const getUserStatusById = async (req, res, next) => {
  logger.info("get User Status ById controller => get User Status");

  try {
    const uid = req.params.id;
    await AdminValidations.idValidate.validateAsync(uid);

    const user = await UserService.getUserStatusById({
      uid,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Url Parameter",
    });

    next(error)
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserStatusById,
};
