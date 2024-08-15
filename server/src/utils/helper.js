import fs from "fs";

/**
 * Removes unused Multer image files on error.
 *
 * @param {Object} req - The request object.
 */
export const removeMulterImageFilesOnError = (req) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log("Error while removing file from local:", err);
      } else {
        console.log("Removed file local path: ", req.file.path);
      }
    });
  }
};
