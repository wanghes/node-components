$(function(){
    $('.special.cards .image').dimmer({
        on: 'hover'
    });
    $('.ui.menu .ui.dropdown').dropdown({
        on: 'hover'
    });
    $('.ui.menu a.item')
        .on('click', function() {
            $(this)
                .addClass('active')
                .siblings()
                .removeClass('active')
            ;
        });


    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    $('.ui.sticky').sticky({
        context: '#detail'
    }) ;

    $('.i_popup').popup({
        position : 'right center'
    });

    $(window).scroll(function(){
        if ($(window).scrollTop()>100){
            $("#back-to-top").show();
        }
        else
        {
            $("#back-to-top").hide();
        }
    });

    $("#back-to-top").click(function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    });

});