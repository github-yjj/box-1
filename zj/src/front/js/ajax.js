

function ajax(method,url,data,success){

	var xhr = null;

	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP")
	}

	if (method === 'get' && data) {
		url += '?' + data;
	}

	xhr.open(method,url,true);

	if(method === 'get'){
		xhr.send();
	}else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}

	xhr.onreadystatechange = function () {
		// console.log(xhr.readyState);
		// console.log(xhr.status);
		if(xhr.readyState === 4 && xhr.status === 200){
			success && success(xhr.responseText);
		}


	}
}