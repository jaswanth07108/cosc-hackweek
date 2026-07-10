const loadBtn = document.getElementById("loadBtn");
const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const summary = document.getElementById("summary");
const exportBtn = document.getElementById("exportBtn");

let allItems = [];

function getSize(text) {
    return new Blob([text]).size + " B";
}
function updateSummary(items){

    const local = items.filter(x=>x.type==="Local Storage").length;
    const session = items.filter(x=>x.type==="Session Storage").length;
    const cookies = items.filter(x=>x.type==="Cookie").length;

    summary.innerHTML=`
        <strong>Total Items:</strong> ${items.length}<br>
        <strong>Local Storage:</strong> ${local}<br>
        <strong>Session Storage:</strong> ${session}<br>
        <strong>Cookies:</strong> ${cookies}
    `;

}

function renderTable(items) {

    tableBody.innerHTML = "";

    if (items.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No storage found
                </td>
            </tr>
        `;

        return;
    }

    items.forEach(item => {
        tableBody.innerHTML += `
<tr>
    <td>${item.type}</td>
    <td>${item.key}</td>
    <td class="value">${item.value}</td>
    <td>${getSize(item.value)}</td>
    <td>
        <button class="deleteBtn" data-key="${item.key}" data-type="${item.type}">
            Delete
        </button>
    </td>
</tr>
`;

    });

}

loadBtn.addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    const result = await chrome.scripting.executeScript({

        target: {
            tabId: tab.id
        },

        func: () => {

            const data = [];

            // Local Storage
            for (let i = 0; i < localStorage.length; i++) {

                const key = localStorage.key(i);

                data.push({
                    type: "Local Storage",
                    key,
                    value: localStorage.getItem(key)
                });

            }

            // Session Storage
            for (let i = 0; i < sessionStorage.length; i++) {

                const key = sessionStorage.key(i);

                data.push({
                    type: "Session Storage",
                    key,
                    value: sessionStorage.getItem(key)
                });

            }

            // Cookies
            document.cookie.split(";").forEach(cookie => {

                if (!cookie.trim()) return;

                const parts = cookie.split("=");

                data.push({
                    type: "Cookie",
                    key: parts[0].trim(),
                    value: parts.slice(1).join("=")
                });

            });

            return data;

        }

    });

    allItems = result[0].result;

    renderTable(allItems);
    updateSummary(allItems);

});

search.addEventListener("input", () => {

    const text = search.value.toLowerCase();

    const filtered = allItems.filter(item =>

        item.key.toLowerCase().includes(text) ||
        item.value.toLowerCase().includes(text) ||
        item.type.toLowerCase().includes(text)

    );

    renderTable(filtered);
    updateSummary(filtered);

});
exportBtn.addEventListener("click", () => {

    if(allItems.length === 0){

        alert("Load storage first!");

        return;
    }

    const blob = new Blob(
        [JSON.stringify(allItems, null, 4)],
        {type:"application/json"}
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "browser-storage.json";

    a.click();

    URL.revokeObjectURL(url);

});
tableBody.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("deleteBtn")) return;

    const key = e.target.dataset.key;
    const type = e.target.dataset.type;

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    await chrome.scripting.executeScript({

        target: {
            tabId: tab.id
        },

        func: (key, type) => {

            if(type === "Local Storage"){
                localStorage.removeItem(key);
            }

            if(type === "Session Storage"){
                sessionStorage.removeItem(key);
            }

        },

        args: [key, type]

    });

    loadBtn.click();

});