var CONSTANTS = {
	ENABLE: 'Enable',
	DISABLE: 'Disable'
};


function init(){
	var modelJsonUrl = "https://www.kebena.cn/model-data.json";
	var list = [];
	$.ajaxSettings.async=false;
	$.getJSON(modelJsonUrl,function(data){list = data;});
	for(var i=0;i<list.length;i++){
		var tag;
		if(i==0){
			tag = '<li><input id="tag'+i+'" name="tag" type="radio" value="'+i+'"checked="true" /> </li>';
		}else{
			tag = '<li><input id="tag'+i+'" name="tag" type="radio" value="'+i+'" />  </li>';
		}
		$("#indexUl").append(tag);
	}
}
init();

// 设置radio点击事件
var chlids = document.querySelectorAll('input[name="tag"]');
console.log(chlids)
for(var i = 0;i<chlids.length;i++){
	chlids[i].addEventListener('click',function() {
        var index = $('input:radio[name="tag"]:checked').val(); 
		console.log(index)
		chrome.extension.sendMessage({name: 'setIndex', status: index}, function() {});
	})
}



chrome.extension.sendMessage({name: 'getOptions'}, function(response) {
	document.getElementById('isKai').value = response.enableDisable;
});

chrome.extension.sendMessage({name: 'getIndex'}, function(response) {
	$("#tag"+response.index).attr("checked","true")
});

document.querySelector('#isKai').addEventListener('click', function() {
	if(document.getElementById('isKai').value === CONSTANTS.DISABLE) {
		// save to localstore
		chrome.extension.sendMessage({name: 'setOptions', status: CONSTANTS.ENABLE}, function() {});
		document.getElementById('isKai').value = CONSTANTS.ENABLE;
	} else if(document.getElementById('isKai').value === CONSTANTS.ENABLE) {
		// save to localstore
		chrome.extension.sendMessage({name: 'setOptions', status: CONSTANTS.DISABLE}, function() {});
		document.getElementById('isKai').value = CONSTANTS.DISABLE;
	}
});




