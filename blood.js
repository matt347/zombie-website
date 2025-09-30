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
document.body.appendChild(canvas);

let paintBlood = false;
let prev_angle = getRandomInt(0, 360);

window.addEventListener("mousemove", (e) => {
    if (paintBlood) {
        paintBlood = false;
        const img = document.createElement("img");
        img.src = "../blood_img.png";
        const size = getRandomInt(75, 163);
        img.style.left = `${e.pageX - (size/2)}px`;
        img.style.top = `${e.pageY - (size/2)}px`;
        img.style.position = "absolute";
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
    if (paintBlood) {
        document.getElementById("bloodBtn").textContent = "Stop Blood Effect";
    }
    else {
        document.getElementById("bloodBtn").textContent = "Start Blood Effect";
    }
}