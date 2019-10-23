
var waifuResult = {
    "mouseover": [
        {
            "selector": ".container a[href^='http']",
            "text": ["要看看 <span style=\"color:#0099cc;\">{text}</span> 么？"]
        },
        {
            "selector": ".fui-home",
            "text": ["点击前往首页，想回到上一页可以使用浏览器的后退功能哦"]
        },
        {
            "selector": "#tor_show",
            "text": ["翻页比较麻烦吗，点击可以显示这篇文章的目录呢"]
        },
        {
            "selector": "#comment_go,.fui-chat",
            "text": ["想要去评论些什么吗？"]
        },
        {
            "selector": "#night_mode",
            "text": ["深夜时要爱护眼睛呀"]
        },
        {
            "selector": "#qrcode",
            "text": ["手机扫一下就能继续看，很方便呢"]
        },
        {
            "selector": ".comment_reply",
            "text": ["要吐槽些什么呢"]
        },
        {
            "selector": "#back-to-top",
            "text": ["回到开始的地方吧"]
        },
        {
            "selector": "#author",
            "text": ["该怎么称呼你呢"]
        },
        {
            "selector": "#mail",
            "text": ["留下你的邮箱，不然就是无头像人士了"]
        },
        {
            "selector": "#url",
            "text": ["你的家在哪里呢，好让我去参观参观"]
        },
        {
            "selector": "#textarea",
            "text": ["认真填写哦，垃圾评论是禁止事项"]
        },
        {
            "selector": ".OwO-logo",
            "text": ["要插入一个表情吗"]
        },
        {
            "selector": "#csubmit",
            "text": ["要提交了吗，首次评论需要审核，请耐心等待~"]
        },
        {
            "selector": "c-player a.play-icon",
            "text": ["想要听点音乐吗"]
        },
        {
            "selector": "c-player div.time",
            "text": ["在这里可以调整<span style=\"color:#0099cc;\">播放进度</span>呢"]
        },
        {
            "selector": "c-player div.volume",
            "text": ["在这里可以调整<span style=\"color:#0099cc;\">音量</span>呢"]
        },
        {
            "selector": "c-player div.list-button",
            "text": ["<span style=\"color:#0099cc;\">播放列表</span>里都有什么呢"]
        },
        {
            "selector": "c-player div.lyric-button",
            "text": ["有<span style=\"color:#0099cc;\">歌词</span>的话就能跟着一起唱呢"]
        },
        {
            "selector": ".waifu #live2d",
            "text": ["干嘛呢你，快把手拿开", "鼠…鼠标放错地方了！"]
        }
    ],
    "click": [
        {
            "selector": ".waifu #live2d",
            "text": ["是…是不小心碰到了吧", "要好好学习哦~", "你看到我的小熊了吗", "再摸的话我可要报警了！⌇●﹏●⌇", "110吗，这里有个变态一直在摸我(ó﹏ò｡)"]
        }
    ]
}


function render(template, context) {

    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {  
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.render = function (context) {
    return render(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦', 5000);
});



(function(){
    var result = waifuResult;
    console.log("login ok"+waifuResult)
    $.each(result.mouseover, function (index, tips){
        $(document).on("mouseover", tips.selector, function (){
            var text = tips.text;
            if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
            text = text.render({text: $(this).text()});
            showMessage(text, 3000);
        });
    });
    $.each(result.click, function (index, tips){
        $(document).on("click", tips.selector, function (){
            var text = tips.text;
            if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
            text = text.render({text: $(this).text()});
            showMessage(text, 3000);
        });
    });
})

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = 'Hello! 来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = 'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'so') {
            text = 'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'google') {
            text = 'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    }else {
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
            } else if (now > 5 && now <= 7) {
                text = '早上好！一日之计在于晨，美好的一天就要开始了';
            } else if (now > 7 && now <= 11) {
                text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
            } else if (now > 11 && now <= 14) {
                text = '中午了，工作了一个上午，现在是午餐时间！';
            } else if (now > 14 && now <= 17) {
                text = '午后很容易犯困呢，今天的运动目标完成了吗？';
            } else if (now > 17 && now <= 19) {
                text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
            } else if (now > 19 && now <= 21) {
                text = '晚上好，今天过得怎么样？';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，晚安~';
            } else {
                text = '嗨~ 快来逗我玩吧！';
            }
    }
    showMessage(text, 6000);
});

window.setInterval(showHitokoto,30000);

function showHitokoto(){
    $.getJSON('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json',function(result){
        showMessage(result.hitokoto, 5000);
    });
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    console.log(text);
    $('.waifu-tips').stop();
    $('.waifu-tips').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}
function hideMessage(timeout){
    $('.waifu-tips').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.waifu-tips').delay(timeout).fadeTo(200, 0);
}



