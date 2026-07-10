let documentText = "";

function setDocument(text) {
    documentText = text;
}

function getDocument() {
    return documentText;
}

module.exports = {
    setDocument,
    getDocument
};