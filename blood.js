const canvas = document.createElement("canvas");
Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "900"
});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
document.body.appendChild(canvas);

let paintBlood = false;
let prev_angle = getRandomInt(0, 360);

window.addEventListener("mousemove", (e) => {
    if (paintBlood) {
        paintBlood = false;
        const img = document.createElement("img");
        img.src = "../images/blood_img.png";
        const size = getRandomInt(75, 163);
        img.style.left = `${(e.pageX - window.scrollX) - (size/2)}px`;
        img.style.top = `${(e.pageY - window.scrollY) - (size/2)}px`;
        img.style.position = "fixed";
        img.style.pointerEvents = "none";
        img.style.userSelect = "none";
        img.style.width = size + "px";
        img.style.height = size + "px";
        img.style.zIndex = "1000";
        const angle = prev_angle + getRandomInt(-45, 45);
        const scale = .9 + (Math.random() * .2);
        img.style.transform = `rotate(${angle}deg) scale(${scale})`;
        img.style.transformOrigin = "50% 50%";
        img.style.willChange = "transform";
        prev_angle = angle;
        document.body.insertBefore(img, canvas);
        fadeOutBlood(img);
        wait_blood();
    }
});
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function fadeOutBlood(img) {
    setTimeout(() => {
        img.classList.add("fade-out");
        setTimeout(() => { 
            img.remove()
        }, 1000);
    }, 1000);
}
function wait_blood() {
    setTimeout(() => {
        paintBlood = true;
    }, 10);
}
function toggleBlood() {
    paintBlood = !paintBlood;
    const tBtn = document.getElementById("bloodBtn");
    const bBtn = document.getElementById("bloodBtnBottom");
    if (paintBlood) {
        tBtn.textContent = "Stop Blood Effect";
        bBtn.textContent = "Stop Blood Effect";
        tBtn.setAttribute("aria-pressed", "true")
        bBtn.setAttribute("aria-pressed", "true")
        tBtn.setAttribute("aria-label", "Stop Blood Effect")
        bBtn.setAttribute("aria-label", "Stop Blood Effect")
    }
    else {
        tBtn.textContent = "Start Blood Effect";
        bBtn.textContent = "Start Blood Effect";
        tBtn.setAttribute("aria-pressed", "false")
        bBtn.setAttribute("aria-pressed", "false")
        tBtn.setAttribute("aria-label", "Start Blood Effect")
        bBtn.setAttribute("aria-label", "Start Blood Effect")
    }
}