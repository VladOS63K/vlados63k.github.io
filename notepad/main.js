tabs = [];

var bodyAfter;
var currentTabKey = null;

var tgData = null;

function loadNotes() {
    var tabsNode = document.getElementById("tabs");
    while (tabsNode.firstChild) {
        tabsNode.firstChild.remove();
    }
    tabs = [];

    try {
        var list = JSON.parse(window.localStorage.getItem("notes"));

        list.forEach((e) => {
            var tab = document.createElement('div');
            tab.setAttribute("note-id", e.key);
            tab.className = "tab";
            var textDiv = document.createElement('div');
            var delBtn = document.createElement('button');
            var delImg = document.createElement('img');
            textDiv.innerHTML = e.key;
            delImg.src = "https://img.icons8.com/sf-regular/24/FFFFFF/trash";
            delBtn.appendChild(delImg);
            delBtn.setAttribute('width', '24px');
            delBtn.setAttribute('height', '24px');
            delBtn.className = "delete-note-btn";
            delBtn.onclick = function () {
                if (confirm("Delete " + e.key + " ?")) {
                    tabs.splice(tabs[tabs.indexOf(findNote(e.key))], 1);
                    tabs[tabs.indexOf(findNote(currentTabKey))] = { key: currentTabKey, value: document.querySelector('textarea').value };
                    saveNotes();
                    window.location.reload();
                }
            }
            tab.appendChild(textDiv);
            tab.appendChild(delBtn);
            textDiv.onclick = function () {
                if (currentTabKey != null) {
                    tabs[tabs.indexOf(findNote(currentTabKey))] = { key: currentTabKey, value: document.querySelector('textarea').value };
                    saveNotes();
                }
                try {
                    const textarea = document.querySelector('textarea');
                    const saveBtn = document.getElementById('save-btn');
                    textarea.value = findNote(tab.getAttribute('note-id')).value;
                    textarea.removeAttribute('disabled');
                    textarea.placeholder = 'Write here...';
                    document.getElementById('editing-label').innerHTML = "Editing: " + tab.getAttribute('note-id');
                    saveBtn.title = "Save " + tab.getAttribute('note-id');
                    currentTabKey = tab.getAttribute('note-id');
                } catch (err) {
                    alert("Error: " + err);
                }
            }
            document.getElementById("tabs").appendChild(tab);
            tabs.push(e);
        });
    }
    catch (err) {
        console.warn("Error while loading notes... " + err);
    }
}

function saveNotes() {
    var list = JSON.stringify(tabs);
    window.localStorage.setItem("notes", list);
    loadNotes();
}

function newNote(name) {
    if ((name != "" || name != null) && findNote(name) == null) {
        tabs.push({ key: name, value: "Your new " + name + " note!" })
        saveNotes();
    }
    else {
        alert("Enter valid name of note or note is already exists!");
    }
}

function findNote(key) {
    finded = null;
    tabs.forEach((e) => {
        if (e.key == key) {
            finded = e;
        }
    });
    return finded;
}

window.onbeforeunload = function (e) {
    if (currentTabKey != null && findNote(currentTabKey).value != document.querySelector('textarea').value) {
        return confirm();
    }
    return;
}

$(document).ready(function () {
    setTimeout(function () {
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
    }, 1500);
})

document.addEventListener('DOMContentLoaded', function () {
    const backgrndSelector = document.getElementById("background-selector");
    const backgrndSelectorBtn = document.getElementById("backgrnd-selector-btn");
    const backgrndClearBtn = document.getElementById("backgrnd-clear-btn");
    const newNoteBtn = document.getElementById("create-note-btn");
    const saveBtn = document.getElementById("save-btn");
    const clearBtn = document.getElementById("clear-btn");

    if (window.localStorage.getItem("background") != null) {
        var content = window.localStorage.getItem("background");
        if (bodyAfter != null) {
            document.head.removeChild(bodyAfter);
            bodyAfter = null;
        }
        bodyAfter = document.createElement("style");
        bodyAfter.innerHTML =
            "body:after {background: fixed url(" + content + ");background-size:cover;background-position:center;background-repeat:no-repeat;}";
        document.head.appendChild(bodyAfter);
    }


    backgrndSelector.onchange = function (e) {
        if (e.target.files[0] != null) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = readerEvent => {
                var content = readerEvent.target.result;
                if (bodyAfter != null) {
                    document.head.removeChild(bodyAfter);
                    bodyAfter = null;
                }
                bodyAfter = document.createElement("style");
                bodyAfter.innerHTML =
                    "body:after {background:url(" + content + ");background-size:cover;background-position:center;background-repeat:no-repeat;}";
                document.head.appendChild(bodyAfter);
                window.localStorage.setItem("background", content);
            }
        }
    }

    backgrndClearBtn.onclick = function () {
        if (bodyAfter != null) {
            document.head.removeChild(bodyAfter);
            bodyAfter = null;
            window.localStorage.removeItem("background");
        }
    }

    backgrndSelectorBtn.onclick = function () {
        backgrndSelector.click();
    }

    newNoteBtn.onclick = function () {
        newNote(document.getElementById("new-note-box").value);
    }

    saveBtn.onclick = function () {
        if (currentTabKey != null && findNote(currentTabKey).value != document.querySelector('textarea').value) {
            tabs[tabs.indexOf(findNote(currentTabKey))] = { key: currentTabKey, value: document.querySelector('textarea').value };
            saveNotes();
            alert("Saved " + currentTabKey + " !");
        }
        else {
            alert("Please load note first or no edits detected...");
        }
    }

    clearBtn.onclick = function () {
        if (tabs.length == 0) {
            alert("No notes exist!");
            return;
        }
        if (confirm("Remove " + tabs.length + " notes?")) {
            window.localStorage.clear();
            window.location.reload();
        }
    }

    loadNotes();

});
