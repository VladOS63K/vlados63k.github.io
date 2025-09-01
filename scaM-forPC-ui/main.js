var isRunning = false;

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('button');
    const settings = document.getElementById('settings');
    const stateText = document.getElementById('state');

    window.chrome.webview.addEventListener("message", function (e) {
        if (e.data.Key == "state") {
            isRunning = e.data.Value;
            if (isRunning) {
                stateText.innerHTML = "включен";
            }
            else {
                stateText.innerHTML = "отключен";
            }
        }
        if (e.data.Key == "updateavailable") {
            document.querySelector('.update-div').style.display = 'flex';
        }
    });

    button.onclick = function () {
        window.chrome.webview.postMessage({
            Key: "button_click",
            Value: null
        });
    }

    settings.onclick = function () {
        window.chrome.webview.postMessage({
            Key: "settings",
            Value: null
        });
    }
});