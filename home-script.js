document.addEventListener("DOMContentLoaded", () => {
    const includes = document.querySelectorAll("[data-include]");

    includes.forEach(async (el) => {
        const file = el.getAttribute("data-include");
        if (!file) return;

        try {
            const res = await fetch(file);
            const html = await res.text();
            el.innerHTML = html;
        } catch (err) {
            console.error("Failed to load:", file);
        }
    });
});
