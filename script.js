const card = document.getElementById("card");
const shuffleBtn = document.getElementById("shuffleBtn");
const flipSound = document.getElementById("flipSound");

let usedCards = [];
let totalCards = 78;

// Hiệu ứng lật + đổi lá
card.addEventListener("click", () => {
    flipSound.play();

    card.classList.add("flip");

    setTimeout(() => {
        let next;
        do next = Math.floor(Math.random() * totalCards) + 1;
        while (usedCards.includes(next));

        usedCards.push(next);
        card.src = `cards/${next}.png`;
    }, 300);

    setTimeout(() => card.classList.remove("flip"), 600);
});

// Xáo lại bài
shuffleBtn.addEventListener("click", () => {
    usedCards = [];
    card.src = "assets/back.png";
});

// --------------- CHECKLIST -----------------

const checklist = document.getElementById("checklist");
const popup = document.getElementById("popup");
const popupDay = document.getElementById("popup-day");
const noteInput = document.getElementById("noteInput");
const saveNote = document.getElementById("saveNote");

let notes = JSON.parse(localStorage.getItem("notes")) || {};
let states = JSON.parse(localStorage.getItem("states")) || {};

function renderChecklist() {
    checklist.innerHTML = "";
    for (let i = 1; i <= 30; i++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.day = i;
        cell.innerHTML = i;

        if (states[i] === "star")
            cell.innerHTML = `<img src="assets/star.png">`;
        else if (states[i] === "moon")
            cell.innerHTML = `<img src="assets/moon.png">`;

        // Click: sao → trăng → trống
        cell.addEventListener("click", () => {
            if (!states[i]) states[i] = Math.random() > 0.5 ? "star" : "moon";
            else if (states[i] === "star") states[i] = "moon";
            else states[i] = null;

            localStorage.setItem("states", JSON.stringify(states));
            renderChecklist();
        });

        // Double click mở ghi chú
        cell.addEventListener("dblclick", () => {
            popup.style.display = "flex";
            popupDay.textContent = i;
            noteInput.value = notes[i] || "";
        });

        checklist.appendChild(cell);
    }
}

saveNote.addEventListener("click", () => {
    let day = popupDay.textContent;
    notes[day] = noteInput.value;
    localStorage.setItem("notes", JSON.stringify(notes));
    popup.style.display = "none";
});

popup.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
});

renderChecklist();
