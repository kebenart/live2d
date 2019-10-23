var CONSTANTS = {
	ENABLE: 'Enable',
	DISABLE: 'Disable'
};

// 加载插件开启状态
function loadOptions() {
	chrome.extension.sendMessage({name: 'getOptions'}, function(response) {
		// set default as disabled
		if(response===undefined || response.enableDisable === undefined) {
			chrome.extension.sendMessage({name: 'setOptions', status: CONSTANTS.DISABLE}, function() {});
		}
	});
}

// 加载插件模型索引
function loadIndex() {
	chrome.extension.sendMessage({name: 'getIndex'}, function(response) {
		// 设置默认模型索引下标 0
		if(response===undefined || response.index === undefined) {
			chrome.extension.sendMessage({name: 'setIndex', status: 0}, function() {});
		}
	
	});
}

// 加载模型
function loadModel(){
	chrome.extension.sendMessage({name: 'getOptions'}, function(response) {
		// set default as disabled
		if(response!=undefined && response.enableDisable === CONSTANTS.ENABLE) {
			chrome.extension.sendMessage({name: 'getIndex'}, function(response) {
				if(response!=undefined && response.index != undefined) {

						var importLiveScript = document.createElement('script'); 
						importLiveScript.src="https://www.kebena.cn/live2d-mini.js";
						var importwaifuScript = document.createElement('script'); 
						importwaifuScript.src="https://www.kebena.cn/waifu-tips.js";
						importwaifuScript.charset="UTF-8";
						var importLink = document.createElement('link'); 
						importLink.rel="stylesheet";
						importLink.href="https://www.kebena.cn/style.css";
						importLink.type="text/css";
						document.head.appendChild(importLiveScript);
						document.head.appendChild(importwaifuScript);
						document.head.appendChild(importLink);
						
						var headDiv = document.createElement('div');
						headDiv.id="headDiv";
						headDiv.innerHTML='<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" width="250" height="500" class="live2d"></canvas></div>';
						document.body.appendChild(headDiv);
						var modelJsonUrl = "https://www.kebena.cn/model-data-2.0.json";
						var list = [];
						$.ajaxSettings.async=false;
						$.getJSON(modelJsonUrl,function(data){list = data;});
						var url = list[response.index].url;
						var loadLive = document.createElement("script");
						loadLive.innerHTML='window.onload =function loadLive(){loadlive2d("live2d", "'+url+'");}';
						document.body.appendChild(loadLive);	
				}
			});
		}
	});
}


loadOptions(); //To set default value on pop-up button

loadIndex();

loadModel();

