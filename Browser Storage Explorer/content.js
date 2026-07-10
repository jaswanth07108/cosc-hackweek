(() => {

    const storageItems = [];

    // Local Storage
    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        storageItems.push({
            type: "Local Storage",
            key,
            value
        });
    }

    // Session Storage
    for (let i = 0; i < sessionStorage.length; i++) {

        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);

        storageItems.push({
            type: "Session Storage",
            key,
            value
        });
    }

    // Cookies
    document.cookie.split(";").forEach(cookie => {

        if (!cookie.trim()) return;

        const parts = cookie.split("=");

        storageItems.push({
            type: "Cookie",
            key: parts[0].trim(),
            value: parts.slice(1).join("=")
        });

    });

    return storageItems;

})();