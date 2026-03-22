/**
 * Vanilla JS Component Loader
 * Fetches HTML from views/ and injects into [data-include] elements.
 */
document.addEventListener("DOMContentLoaded", async () => {
    const includes = document.querySelectorAll('[data-include]');
    const fetchPromises = [];

    for (let el of includes) {
        const file = el.getAttribute('data-include');
        // Fetch HTML component
        const promise = fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Could not load ${file}`);
                return response.text();
            })
            .then(html => {
                el.outerHTML = html; // Replace the placeholder with the actual component UI
            })
            .catch(error => console.error(error));
        
        fetchPromises.push(promise);
    }

    // Wait for all components to be fully injected into the DOM
    await Promise.all(fetchPromises);

    // Fire event so app.js knows the DOM is completely ready for styling, animating, and listening
    document.dispatchEvent(new Event('ComponentsLoaded'));
});
