function loadMathEditor(id) {
    return $("#"+id).contents().find("#MathEditorFrame").contents().find("#MathEditor").html()
}

MathJax.Hub.Config({asciimath2jax: {delimiters: [['$','$'], ['`','`']]}});
MathJax.Hub.Register.StartupHook("End Jax",function () {
    var BROWSER = MathJax.Hub.Browser;
    var jax = "HTML-CSS";
    if (BROWSER.isMSIE && BROWSER.hasMathPlayer) jax = "NativeMML";
    if (BROWSER.isFirefox) jax = "SVG";
    if (BROWSER.isSafari && BROWSER.versionAtLeast("5.0")) jax = "NativeMML";
    return MathJax.Hub.setRenderer(jax);
});
MathJax.Hub.Config({
    CommonHTML: { linebreaks: { automatic: true } },
    "HTML-CSS": { linebreaks: { automatic: true }, extensions: ["handle-floats.js"] },
    SVG: { linebreaks: { automatic: true } },
    "showMathMenu": false,
    preview: ["[math]"]
});
