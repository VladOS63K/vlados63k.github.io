var imgUrls = [];
var divideRes = null;
var delCoff = 6;
var currentIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
    const faceImg = document.getElementById("faceimg");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const counterDiv = document.getElementById("counter");

    fetch("/rblxfaces.json")
        .then(r => {
            r.text().then(tt => {
                var jsonn = JSON.parse(tt);
                var checkedCount = 0;


                divideRes = [];

                for (let i = 0; i < delCoff; i++) {
                    divideRes.push([]);
                }

                for (let i = 0; i < delCoff; i++) {
                    for (let j = checkedCount; j < checkedCount + (jsonn.length / delCoff); j++) {
                        const element = jsonn[j];
                        divideRes[i].push(element);
                    }
                    checkedCount = checkedCount + (jsonn.length / delCoff);
                }

                divideRes.forEach(a => {
                    fetch("https://thumbnails.roblox.com/v1/assets?assetIds=" + JSON.stringify(a).replace("[", "").replace("]", "") + "&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false", { headers: { "Accept": "application/json" } })
                        .then(rr => {
                            if (rr.status != 200) {
                                alert("GET Failed for " + e);
                            }
                            rr.text()
                                .then(t => {
                                    var json = JSON.parse(t);
                                    for (let i = 0; i < json.data.length; i++) {
                                        const element = json.data[i];
                                        imgUrls.push(json.data[i]);
                                    }
                                }).then(() => {
                                    document.querySelector(".loader").animate(
                                        [
                                            { opacity: 0 }
                                        ], {
                                        duration: 100,
                                        iterations: 1
                                    }
                                    );
                                    setTimeout(function () {
                                        document.querySelector(".loader").style.display = 'none';
                                    }, 100);
                                    faceImg.src = imgUrls[0].imageUrl;
                                    currentIndex = 0;
                                    counterDiv.innerHTML = currentIndex+"/"+imgUrls.length;
                                });
                        });
                });

            });
        });

    faceImg.onload = function() {
        document.querySelector(".loader").animate(
                                        [
                                            { opacity: 0 }
                                        ], {
                                        duration: 100,
                                        iterations: 1
                                    }
                                    );
                                    setTimeout(function () {
                                        document.querySelector(".loader").style.display = 'none';
                                    }, 100);
    }

    nextBtn.onclick = function () {
        if (currentIndex != imgUrls.length - 1) {
            document.querySelector(".loader").animate(
                                        [
                                            { opacity: "none" }
                                        ], {
                                        duration: 100,
                                        iterations: 1
                                    }
                                    );
            document.querySelector(".loader").style.display = 'flex';
            currentIndex++;
            counterDiv.innerHTML = currentIndex+"/"+imgUrls.length;
            faceImg.src = imgUrls[currentIndex].imageUrl;
            
        }
    }

    prevBtn.onclick = function () {
        if (currentIndex != 0) {
            document.querySelector(".loader").animate(
                                        [
                                            { opacity: "none" }
                                        ], {
                                        duration: 100,
                                        iterations: 1
                                    }
                                    );
            document.querySelector(".loader").style.display = 'flex';
            currentIndex--;
            counterDiv.innerHTML = currentIndex+"/"+imgUrls.length;
            faceImg.src = imgUrls[currentIndex].imageUrl;
        }
    }

});
