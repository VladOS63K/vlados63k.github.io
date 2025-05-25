const Imgdlg = document.getElementById("Img-dialog");
const dlgImg = document.getElementById("Img-dlg");


function showDlg(imgPath) {
    dlgImg.src = "/scripts/ImgViewer.png";
    Imgdlg.showModal();
}

document.getElementById("close-img-dlg-btn").addEventListener("click", () => {
    Imgdlg.close();
})