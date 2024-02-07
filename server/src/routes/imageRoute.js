import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageMimeTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
};

router.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "..", "..", "db_images", imageName);
  const extension = path.extname(imageName).toLowerCase();
  const mimeType = imageMimeTypes[extension];
  fs.readFile(imagePath, (err, data) => {
    if (err) return console.log(err);
    else {
      res.setHeader("Content-Type", mimeType);
      res.send(data);
    }
  });
});

export default router;
