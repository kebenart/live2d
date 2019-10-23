var CONSTANTS = {
    ENABLE: 'Enable',
    DISABLE: 'Disable',
    HIDDEN: 'Hidden',
    SHOW: 'Show'
};


function init() {
    var modelJsonUrl = "https://www.kebena.cn/model-data-2.0.json?random="+Math.floor(Math.random()*10);
    var list = [];
    $.ajaxSettings.async = false;
    $.getJSON(modelJsonUrl, function (data) {
        list = data;
    });
    for (var i = 0; i < list.length; i++) {
        var tag;
        var name = list[i].name;
        if (i == 0) {
            tag = '<li><input id="tag' + i + '" name="tag" type="radio" value="' + i + '"checked="true" /> ' + name + ' </li>';
        } else {
            tag = '<li><input id="tag' + i + '" name="tag" type="radio" value="' + i + '" /> ' + name + ' </li>';
        }
        $("#indexUl").append(tag);
    }
}

init();

// 设置radio点击事件
var chlids = document.querySelectorAll('input[name="tag"]');
console.log(chlids)
for (var i = 0; i < chlids.length; i++) {
    chlids[i].addEventListener('click', function () {
        var index = $('input:radio[name="tag"]:checked').val();
        console.log(index)
        chrome.extension.sendMessage({name: 'setIndex', status: index}, function () {
        });
    })
}


chrome.extension.sendMessage({name: 'getOptions'}, function (response) {
    var inputValue = response.enableDisable === CONSTANTS.ENABLE ? "关闭插件" : "开启插件";
    document.getElementById('isKai').value = inputValue;
});

chrome.extension.sendMessage({name: 'getIndex'}, function (response) {
    $("#tag" + response.index).attr("checked", "true")
});

chrome.extension.sendMessage({name: 'getQiPao'}, function (response) {
	var inputValue = response.showHidden === CONSTANTS.SHOW ? "隐藏气泡" : "显示气泡";
    document.getElementById('isPao').value = inputValue;
});

document.querySelector('#isKai').addEventListener('click', function () {
    if (document.getElementById('isKai').value === "开启插件") {
        // save to localstore
        chrome.extension.sendMessage({name: 'setOptions', status: CONSTANTS.ENABLE}, function () {
        });
        document.getElementById('isKai').value = "关闭插件";
    } else if (document.getElementById('isKai').value === "关闭插件") {
        // save to localstore
        chrome.extension.sendMessage({name: 'setOptions', status: CONSTANTS.DISABLE}, function () {
        });
        document.getElementById('isKai').value = "开启插件";
    }
});

document.querySelector('#isPao').addEventListener('click', function () {
    if (document.getElementById('isPao').value === "显示气泡") {
        // save to localstore
        chrome.extension.sendMessage({name: 'setQiPao', status: CONSTANTS.SHOW}, function () {
        });
        document.getElementById('isPao').value = "隐藏气泡";
    } else if (document.getElementById('isPao').value === "隐藏气泡") {
        // save to localstore
        chrome.extension.sendMessage({name: 'setQiPao', status: CONSTANTS.HIDDEN}, function () {
        });
        document.getElementById('isPao').value = "显示气泡";
    }
});




