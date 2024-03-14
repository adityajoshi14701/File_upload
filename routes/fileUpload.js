const express = require('express')
const router = express.Router()

const {localFileUpload,imageUpload,videoUpload }= require("../controller/fileUpload");

//imageUpload,videoUpload , imageReduceUpload,
router.post('/imageUpload',imageUpload);
router.post('/videoUpload',videoUpload);
// router.post('/imageReduceUpload',imageReduceUpload);
router.post('/localFileUpload',localFileUpload);


module.exports = router;