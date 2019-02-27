function forceDownload(url, fileName) {
  if (!url) {
    throw new Error('"url" must be specified.');
  }

  var xhr = new XMLHttpRequest();

  xhr.responseType = 'blob';
  xhr.onload = function() {
    var URL = window.URL || window.webkitURL;
    var imageUrl = URL.createObjectURL(xhr.response);
    var tag = document.createElement('a');

    tag.style = 'display: none';
    tag.href = imageUrl;

    if (fileName) {
      tag.download = fileName;
    }

    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
    URL.revokeObjectURL(url);
  };

  xhr.open('GET', url, true);
  xhr.send();
}

module.exports = forceDownload;
