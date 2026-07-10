const pdfInput = document.getElementById("pdfInput");
const fileList = document.getElementById("fileList");
const sendBtn = document.getElementById("sendBtn");
const question = document.getElementById("question");
const chatBox = document.getElementById("chatBox");

let uploadedFile = "";

pdfInput.addEventListener("change", async () => {

    const file = pdfInput.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("pdf", file);

    try {

        const response = await fetch("http://localhost:5000/upload", {

            method: "POST",
            body: formData

        });

        const data = await response.json();

        uploadedFile = data.filename;

        fileList.innerHTML = "";

        const li = document.createElement("li");

        li.textContent = data.originalName;

        fileList.appendChild(li);

        alert("PDF Uploaded Successfully!");

    } catch (err) {

        console.log(err);

        alert("Upload Failed!");

    }

});

sendBtn.addEventListener("click", async () => {

    if (question.value.trim() === "") return;

    const userQuestion = question.value;

    const user = document.createElement("div");
    user.className = "user-message";
    user.textContent = userQuestion;
    chatBox.appendChild(user);

    question.value = "";

    const bot = document.createElement("div");
    bot.className = "bot-message";
    bot.textContent = "⏳ Thinking...";
    chatBox.appendChild(bot);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: userQuestion
            })
        });

        const data = await response.json();

        bot.textContent = data.answer;

    } catch (err) {

        console.error(err);

        bot.textContent = "❌ Failed to connect to AI.";

    }

});