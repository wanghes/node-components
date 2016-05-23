$(function(){
    $('#submit').click(function(e){
        e.preventDefault();
        var cateid =$('#cateid').val();
        var name =$('#name').val();


        $.post('/admin/doJsCate',{
            name:name,
            cateid:cateid
        },function(result){
            if(result.status){
                $('.error').addClass('success').remove('error').html(result.message).show();
                setTimeout(function(){
                    location.href= '/admin/list';
                },3000);

            }else{
                $('.error').html(result.message).show();
            }
        },'json');

        return false;
    });


    $('#frameSubmit').click(function(e){
        e.preventDefault();
        var cateid =$('#cateFrameworkId').val();
        var name =$('#frameworkName').val();

        $.post('/admin/doFrameworkCate',{
            name:name,
            cateid:cateid
        },function(result){
            if(result.status){
                $('.error').addClass('success').remove('error').html(result.message).show();
                setTimeout(function(){
                    location.href= '/admin/list';
                },3000);
            }else{
                $('.error').html(result.message).show();
            }
        },'json');

        return false;
    });



    $('#articleSubmit').click(function(e){
        e.preventDefault();
        var cateid =$('#cateArticleId').val();
        var name =$('#articleName').val();

        $.post('/admin/doArticleCate',{
            name:name,
            cateid:cateid
        },function(result){
            if(result.status){
                $('.error').addClass('success').remove('error').html(result.message).show();
                setTimeout(function(){
                    location.href= '/admin/list';
                },3000);
            }else{
                $('.error').html(result.message).show();
            }
        },'json');

        return false;
    })
});