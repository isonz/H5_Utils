$(function () {
    closeProcessLink();
    processSuggest();
});

function loadMathEditor(id) {
    return $("#"+id).contents().find("#MathEditor").html()
}

MathJax.Hub.Config({asciimath2jax: {delimiters: [['$','$'], ['`','`']]}});
MathJax.Hub.Register.StartupHook("End Jax",function () {
    var BROWSER = MathJax.Hub.Browser;
    var canUseMML = (BROWSER.isFirefox && BROWSER.versionAtLeast("1.5")) || (BROWSER.isMSIE    && BROWSER.hasMathPlayer) ||(BROWSER.isSafari  && BROWSER.versionAtLeast("5.0")) ||(BROWSER.isOpera   && BROWSER.versionAtLeast("9.52") && !BROWSER.versionAtLeast("14.0"));
    var CONFIG = MathJax.Hub.CombineConfig("MMLorHTML",{prefer: { MSIE:"MML", Firefox:"HTML", Opera:"HTML", Chrome:"HTML", Safari:"HTML", other:"HTML"}});
    var jax = CONFIG.prefer[BROWSER] || CONFIG.prefer.other;
    if (jax === "HTML") jax = "HTML-CSS"; else if (jax === "MML")  jax = "NativeMML";
    if (jax === "NativeMML" && !canUseMML) jax = CONFIG.prefer.other;
    return MathJax.Hub.setRenderer(jax);
});
MathJax.Hub.Config({
    CommonHTML: { linebreaks: { automatic: true } },
    "HTML-CSS": { linebreaks: { automatic: true }, extensions: ["handle-floats.js"] },
    SVG: { linebreaks: { automatic: true } },
    "showMathMenu": false,
    preview: ["[math]"]
});


function processLink() {
    $("#processLink").show();
    return "javascript:getProcessLink(123)";
}

function closeProcessLink() {
    $("#processLink .close").click(function () {
        $("#processLink").hide();
    });
}

function setProcessLinkId() {
    $("#processLink .content li a.tag").click(function () {
        var tag_id = $(this).attr("data-value");
        var link = "javascript:getProcessLink("+tag_id+")";
        $("#mathEditorFrame")[0].contentWindow.setProcessLink(link);
        $("#processLink").hide();
    });
}

function processSuggest() {
    $("#processLink .tag").keyup(function () {
        var val = $(this).val();
        if(val.length < 2){
            $("#processLink .content").html('');
            return false;
        }
        $.get("suggest.json?tag="+val,function (json) {
            var html = '<ul>';

            for(var i=0; i<json.length; i++){
                html += '<li><a href="##" class="tag" data-value="'+ json[i].tag_id +'">'+ json[i].tag_name +'</a></li>';
            }

            html += '</ul>';
            $("#processLink .content").html(html);

            setProcessLinkId();
        })
    });
}


function getProcessLink(pid)
{
    //这里通过 AJAX 获取中间页的 HTML
    alert("这里通过 AJAX 获取中间页 ID 为 "+ pid +" 的HTML");
}