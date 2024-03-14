const File = require("../model/File");
const cloudinary = require("cloudinary").v2;



exports.imageUpload = async (req, res) => {
  try {

      const { name, tags, email } = req.body;
      console.log(name, tags, email);

      // Fetch file 
      const imageFile = req.files.imageFile;
      console.log(imageFile);

      const supportedTypes = ["png", "jpg", "jpeg"];
      const fileType = imageFile.name.split('.')[1].toLowerCase();

      // Check file type is supported or not 
      if (!isFileTypeSupported(fileType, supportedTypes)) {
          return res.status(400).json({
              success: false,
              message: "File type not supported"
          })
      }

      // Upload to Cloudinary
      const response = await uploadFileToCloudinary(imageFile, "Aditya");
      console.log(response)


      // Upload to DB 
      // const fileData = await File.create({
      //     name,
      //     tags,  
      //     email,
      //     fileUrl: response.secure_url
      // })


      res.status(200).json({
          success: true,
          message: "File uploaded successfully",
          file: fileData
      })

  }
  catch (error) {
      console.log("catch error ->",error)

      res.status(400).json({
          success: false,
          message: "Something went wrong"
      })
  }
}

exports.videoUpload = async (req, res) => {
  try {
      // Fetch Data 
      const { name, tags, email } = req.body;
      console.log(name, tags, email);

      const videoFile = req.files.videoFile;

      // Validation 
      const supportedTypes = ["mp4", "mov"];
      const fileType = videoFile.name.split(".")[1].toLowerCase();

      // HW - File Maximum 5MB
      if (!isFileTypeSupported(fileType, supportedTypes)) {
          res.status(400).json({
              success: false,
              message: "File type not supported"
          })
      }

      // Supported 
      // File Upload to the Cloudinary 
      const response = await uploadFileToCloudinary(videoFile, "FileApp");

      // Upload To DB
      const vidFile = new File({
          name,
          tags,
          email,
          fileUrl: response.secure_url
      })

      const file = await vidFile.save();

      res.status(200).json({
          success: true,
          message: "video file uploaded successfully",
          file: file
      })
  }
  catch (err) {
      console.error(err)
      res.status(400).json({
          success: false,
          message: "Something went wrong"
      })
  }
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  if (quality) {
      options.quality = quality;
  }
  options.resource_type = "auto"
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}


function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}
// exports.videoUpload
// exports.imageReduceUpload
exports.localFileUpload = async (req, res) => {
  try {
    //fetch filefrom request
    console.log("req.files ->: ", req.files);
    const file = req.files.file;
    console.log("FILE AAGYI JEE -> ", file);

    //create path where file need to be stored on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("PATH-> ", path);

    //add path to the move fucntion
    file.mv(path, (err) => {
      console.log(err);
    });

    //create a successful response
    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.log("Not able to upload the file on server");
    console.log(error);
  }
};
