const multer = require("multer");
// const {v1: uuid } = require('uuid');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/bmp": "bmp",
  "image/gif": "gif",
  "image/vnd.microsoft.icon": "icon",
  "image/svg+xml": "svg",
  "image/tiff": "tiff",
  "image/tiff": "tif",
  "image/webp": "webp",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/media");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type");
    cb(error, isValid);
  },
});

module.exports = fileUpload;