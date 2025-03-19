const saturate = document.getElementById("saturate");
const contrast = document.getElementById("contrast");
const brightness = document.getElementById("brightness");
const sepia = document.getElementById("sepia");
const grayscale = document.getElementById("grayscale");
const blur = document.getElementById("blur");
const hueRotate = document.getElementById("hue-rotate");
const upload = document.getElementById("upload");
const download = document.getElementById("download");
const img = document.getElementById("img");
const reset = document.querySelector("span");
const imgBox = document.querySelector(".img-box");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

window.onload = function () {
    imgBox.style.display = "none";
}

upload.onchange = function () {
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function () {
        img.src = file.result;
        imgBox.style.display = "block";
    }
}

let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener('input', function () {
        img.style.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `;
    });
});

reset.onclick = function () {
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayscale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
    img.style.filter = "none";
}

download.onclick = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.filter = img.style.filter;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL();
    link.click();
};
