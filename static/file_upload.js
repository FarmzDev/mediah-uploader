var file = ""
function dragOverHandler(ev) {
    ev.preventDefault();
}
function dropHandler(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.items) {
        [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
            file = item.getAsFile();
            console.log(file)
            hideBrowse()
        }
        });
    }
}
function upload() {
    console.log(file)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var formData = new FormData();
    formData.append("file", file);
    xhr.send(formData)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                downloadFile(xhr.responseText, btoa(JSON.parse(xhr.responseText)["filename"].substring(0, JSON.parse(xhr.responseText)["filename"].lastIndexOf('.'))).substring(0, 56) + ".json", "text/plain")
            } else {
                console.error('Request failed: ' + xhr.status);
        }
    }
}
}
document.getElementById('browse').addEventListener('change', function() {
    file = this.files[0];
    if (file) {
        hideBrowse()
    } else {
        unhideBrowse()
    }
});
document.getElementById('fileEditButton').addEventListener('change', function() {
    file = this.files[0];
    if (file) {
        hideBrowse()
    } else {
        unhideBrowse()
    }
});
function downloadFile(bytes, fileName, mimeType) {
    const blob = new Blob([bytes], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
function hideBrowse() {
    document.getElementById("fileNameContainer").hidden = false;
    document.getElementById("fileName").hidden = false;
    document.getElementById("fileName").textContent = file.name;
    document.getElementById("fileEditButton").hidden = false;
    document.getElementById("upload").hidden = false;
    document.getElementById("browseButton").hidden = true;
    document.getElementById("browseText").hidden = true;
}
function unhideBrowse() {
    document.getElementById("fileNameContainer").hidden = true;
    document.getElementById("fileName").hidden = true;
    document.getElementById("fileEditButton").hidden = true;
    document.getElementById("upload").hidden = true;
    document.getElementById("browseButton").hidden = false;
    document.getElementById("browseText").hidden = false;
}