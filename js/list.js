$(function(){
	//nav部分的超过一定距离固定在头部
	var height=$('#wrap').offset().top;
         $(document).scroll(function(){
             var scrollTop = $(this).scrollTop();
             if(scrollTop>height){
               $('#wrap').css({'position':'fixed','left':0,'top':0});
             }else{
                 $('#wrap').css({'position':'relative'});
             }
         });
	
	$('#many li').click(function(){
		$(window).attr('location','detail.html');
	})
	
	
	
	
	
})
