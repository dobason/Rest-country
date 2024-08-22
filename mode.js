const modeBtn = document.getElementById('mode');
const text = document.getElementById('text');
const body = document.body;

modeBtn.addEventListener('click', () => {
    // Toggle dark mode class on the body element
    body.classList.toggle('dark-mode');

    // Update the text content based on the current mode
    if (body.classList.contains('dark-mode')) {
        text.innerText = 'Light mode';
    } else {
        text.innerText = 'Dark mode';
    }
});
