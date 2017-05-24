$(function () {
    //
});

$(document).on("pageinit","#pagetwo",function(){

    $(".tap").tap(function(){
        $(this).css("background","#ff0000");
    });

    $(".taphold").taphold(function(){
        $(this).css("background","#ff0000");
    });
});