const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");
const downloadBtn = document.getElementById("downloadBtn");
let objectURL = null;

async function query() {
    image.src = "/loder.gif";
    const response = await fetch(
        "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify({"inputs": inputTxt.value}),
        }
    );
    const result = await response.blob();
    return result;
}

button.addEventListener('click', async function (){
    query().then((response) => {
        objectURL = URL.createObjectURL(response);
        image.src = objectURL;
        downloadBtn.style.display = "inline"; // Show download button
    });
});

downloadBtn.addEventListener('click', function () {
    if (objectURL) {
        const a = document.createElement('a');
        a.href = objectURL;
        a.download = 'generated_image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert("No image available for download");
    }
});
