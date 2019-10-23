var CONSTANTS = {
    ENABLE: 'Enable',
    DISABLE: 'Disable',
    HIDDEN: 'Hidden',
    SHOW: 'Show'
};

// 加载插件开启状态
function loadOptions() {
    chrome.extension.sendMessage({name: 'getOptions'}, function (response) {
        // set default as disabled
        if (response === undefined || response.enableDisable === undefined) {
            chrome.extension.sendMessage({name: 'setOptions', status: CONSTANTS.DISABLE}, function () {
            });
        }
    });
}

// 加载气泡开启状态
function loadQiPao() {
    chrome.extension.sendMessage({name: 'getQiPao'}, function (response) {
        // set default as disabled
        if (response === undefined || response.showHidden === undefined) {
            chrome.extension.sendMessage({name: 'setQiPao', status: CONSTANTS.HIDDEN}, function () {
            });
        }
    });
}

// 加载插件模型索引
function loadIndex() {
    chrome.extension.sendMessage({name: 'getIndex'}, function (response) {
        // 设置默认模型索引下标 0
        if (response === undefined || response.index === undefined) {
            chrome.extension.sendMessage({name: 'setIndex', status: 0}, function () {
            });
        }

    });
}

// 加载模型
function loadModel() {
    chrome.extension.sendMessage({name: 'getOptions'}, function (response) {
        // set default as disabled
        if (response != undefined && response.enableDisable === CONSTANTS.ENABLE) {
            chrome.extension.sendMessage({name: 'getIndex'}, function (responseIndex) {
                if (responseIndex != undefined && responseIndex.index != undefined) {
                    chrome.extension.sendMessage({name: 'getQiPao'}, function (response) {
                        if (response != undefined) {
                            var importLiveScript = document.createElement('script');
                            importLiveScript.src = "https://www.kebena.cn/live2d-mini.js";
                            var importLink = document.createElement('link');
                            importLink.rel = "stylesheet";
                            importLink.href = "https://www.kebena.cn/style.css";
                            importLink.type = "text/css";
                            document.head.appendChild(importLiveScript);
                            document.head.appendChild(importLink);

                            var headDiv = document.createElement('div');
                            headDiv.id = "headDiv";
                            var htmlValue = '<div id="waiff" class="waifu">';
                            var modelJsonUrl = "https://www.kebena.cn/model-data-2.0.json?random="+Math.floor(Math.random()*10);
                            var list = [];
                            $.ajaxSettings.async = false;
                            $.getJSON(modelJsonUrl, function (data) {
                                list = data;
                            });
                            var model = list[responseIndex.index];
                            var url =model.url;
                            if (response.showHidden === CONSTANTS.SHOW) {
                                var importwaifuScript = document.createElement('script');
                                importwaifuScript.src = "https://www.kebena.cn/waifu-tips.js";
                                importwaifuScript.charset = "UTF-8";
                                document.head.appendChild(importwaifuScript);

                                htmlValue += '<div class="waifu-tips" style="top:'+model.waifuTop+'"></div>';
                            }
                            htmlValue += '<canvas id="live2d" width="'+model.canvasWidth+'" height="'+model.canvasHeight+'" class="live2d"></canvas></div>';
                            headDiv.innerHTML = htmlValue;
                            document.body.appendChild(headDiv);
                            var loadLive = document.createElement("script");
                            loadLive.innerHTML = 'window.onload =function loadLive(){loadlive2d("live2d", "' + url + '");};var dv=document.getElementById("waiff");var x=0;var y=0;var l=0;var t=0;var isDown=false;dv.onmousedown=function(e){x=e.clientX;y=e.clientY;l=dv.offsetLeft;t=dv.offsetTop;isDown=true;dv.style.cursor="move"};window.onmousemove=function(e){if(isDown==false){return}var nx=e.clientX;var ny=e.clientY;var nl=nx-(x-l);var nt=ny-(y-t);dv.style.left=nl+"px";dv.style.top=nt+"px"};dv.onmouseup=function(){isDown=false;dv.style.cursor="default"};';
                            document.body.appendChild(loadLive);
                        }
                    });

                }
            });
        }
    });
}



loadOptions(); //To set default value on pop-up button

loadQiPao();

loadIndex();

loadModel();

