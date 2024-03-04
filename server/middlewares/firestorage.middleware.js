const Multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");
// replace this with path to your firebase admin sdk
const fireCert = require("../cert/email-editor-78dc5-firebase-adminsdk-8zkaa-c27b38c940.json");
const { bucketName } = require("../config");

// change this config to match your server credentials
const multerFireStorage = Multer({
  storage: FirebaseStorage({
    bucketName: 'email-editor-78dc5.appspot.com',
    credentials: {
      clientEmail: fireCert.client_email,
      privateKey: fireCert.private_key,
      projectId: fireCert.project_id,
    },
    public: true,
    unique: true,
    hooks: {
      beforeInit(instance) {
        console.log(`before init:`, instance);
      },
      beforeUpload(req, file) {
        let fileEx = file.originalname.split(".")[1];
        const fileName = `SUPA_${new Date().getTime()}.${fileEx}`;
        file.filename = fileName;
        file.originalname = fileName;
      },
    },
  }),
  limits: { fieldSize: 10 * 1024 * 1024 },
});

module.exports = multerFireStorage;
