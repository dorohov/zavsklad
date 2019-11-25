(function($) {
    "use strict"
    $(function() {

        if($(window).innerWidth() > 1200) {
            $(".c-scroll").customScrollbar({
                updateOnWindowResize: true
            });
        }
        
    })
})(jQuery);