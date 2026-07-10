const express = require("express");
const groq = require("../utils/groq");
const { getDocument } = require("../utils/documentStore");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const { question } = req.body;

        const document = getDocument();

        if (!document) {

            return res.status(400).json({
                answer: "Please upload a PDF first."
            });

        }
        console.log(getDocument());

        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [

                {
                    role: "system",
                    content:
                        "You are an AI assistant. Answer ONLY from the uploaded document. If the answer is not available, clearly say you couldn't find it in the document."
                },

                {
                    role: "user",
                    content:
`Document:

${document}

Question:

${question}`
                }

            ]

        });

        res.json({

            answer: completion.choices[0].message.content

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            answer:"Groq Error"

        });

    }

});

module.exports=router;