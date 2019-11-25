(function($) {
    "use strict"
    $(function() {

        function openAside() {
            $('body').addClass('is--aside')
            openOverlay()
            $('.navbar__main__mobile button').addClass('is-active')
        }

        function closeAside() {
            $('body').removeClass('is--aside')
            closeOverlay()
            $('.navbar__main__mobile button').removeClass('is-active')
        }

        function toggleAside() {
            if($('body').hasClass('is--aside')) {
                closeAside()
            }else {
                openAside()
            }
        }

        function showNavbar() {
            $('.navbar').removeClass('is--hidden')
        }

        function hideNavbar() {
            $('.navbar').addClass('is--hidden')
        }

        $('.overlay').on('click', function() {
            closeAside()
        })

        $('.navbar__main__mobile button').on('click', function() {
            toggleAside()
        })

        var lastScrollTop = 0

        $(document).scroll(function(e) {
            var st = $(this).scrollTop()
            if (st > lastScrollTop && st > $('.navbar').innerHeight()){
                hideNavbar()
            } else {
                showNavbar()
            }
            lastScrollTop = st
        })
        
    })
})(jQuery);