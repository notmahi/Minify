var id = chrome.contextMenus.create({"title": "Minify link", "onclick": minify, "contexts": ["page", "link", "image"]}, function(){
	console.log('done');
});

function minify(info, tab){
	var url;
	if ( info.pageUrl !== undefined ) {
		url = info.pageUrl;
	};
	if ( info.linkUrl !== undefined ) {
		url = info.linkUrl;
	};
	if ( info.srcUrl !== undefined ) {
		url = info.srcUrl;
	};
	var params = '{"longUrl": "' + url +' "}';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://www.googleapis.com/urlshortener/v1/url", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(params);

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var resp = JSON.parse(xhr.responseText);
			var shortUrl = resp.id;
			console.log(shortUrl);
			Copy(shortUrl);
		};
	};
};

function Copy (text) {
  var copyFrom = $('<textarea/>');
  copyFrom.text(text);
  $('body').append(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.remove();
};