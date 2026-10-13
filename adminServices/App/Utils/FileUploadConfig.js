const multer = require("multer");
const path = require("path");
const fs = require("fs");

const configureMulter = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let uploadPath = "";

      const basePath = path.join(__dirname, "../../../public/uploads");

      if (file.fieldname === "images") {
        uploadPath = path.join(basePath, "images");
      }

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `UploadFile_${uniqueSuffix}${ext}`);
    },
  });

  return multer({ storage });
};

module.exports = configureMulter;
