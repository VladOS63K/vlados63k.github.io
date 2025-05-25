const imgDialog = document.getElementById("img-dialog")
const dlgImg = imgDialog.childNodes[0]


function showDlg(imgPath) {
    if (imgPath === 1) dlgImg.src = "/scripts/ImgViewer.png";
    imgDialog.showModal();
}

document.getElementById("close-img-dlg-btn").addEventListener("click", () => {
    imgDialog.close();
})