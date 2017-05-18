$(document).ready(function() 
{
	/** div mouseover, mouseleave
     * <a href="/?route=checkout/cart" data-toggle="over-leave">test</a> <div class="over-leave">....</div>
     */
	var OVERTIMER, LEAVETIMER;
    $(document).on('mouseover', '[data-toggle=\'over-leave\']', function(e) {
        clearTimeout(LEAVETIMER);
        OVERTIMER = setTimeout(function () {
            $('.over-leave').show();
        },500);
    });
    $(document).on('mouseleave', '[data-toggle=\'over-leave\']', function(e) {
        clearTimeout(OVERTIMER);
        LEAVETIMER = setTimeout(function () {
            $('.over-leave').hide();
        },1000);
    });
    $(".over-leave").on('mouseover',function () {
        clearTimeout(LEAVETIMER);
		$(this).show();
    });
    $(".over-leave").on('mouseleave',function () {
        clearTimeout(OVERTIMER);
        LEAVETIMER = setTimeout(function () {
            $('.over-leave').hide();
        },1000);
    });


    /** 
     * 
     */

});
