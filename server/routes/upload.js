const express = require("express");
const multer = require("multer");
const path = require("path");

const readPDF = require("../utils/pdfReader");
const { setDocument } = require("../utils/documentStore");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {

        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed."));
        }

    }
});

router.post("/", upload.single("pdf"), async (req, res) => {

    try {

        const text = await readPDF(req.file.path);

        setDocument(text);

        res.json({
            success: true,
            filename: req.file.filename,
            originalName: req.file.originalname,
            characters: text.length
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;