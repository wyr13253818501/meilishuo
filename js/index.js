$(function(){
	//宝贝店铺的选项卡
	$('.shop').bind('click',function(){
		$(this).addClass('active');
		$('.baby').removeClass('active');
	})
	$('.baby').bind('click',function(){
		$(this).addClass('active');
		$('.shop').removeClass('active');
	})
	
	//输入框跨域
	
	//https://suggest.taobao.com/sug?code=utf-8&q='+searchIpt.value+'&_ksTS=1497491397700_2187&callback=callback&k=1&area=c2c&bucketid=3
	var now=-1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
	var resLength=0;  //这个变量是为了存li的长度
	$('#text').keyup(function(event){
	    if(event.keyCode==38 || event.keyCode==40){    //每按一次上下键都会发送一次请求，所以要先
	        return;                                  //清除一边请求
	    };
	    var dat={
	        wd:$('#text').val()
	    };
	    if($('#text').val()!=''){  //当输入框的值不为空的时候才能发送请求
	        $.ajax({
	            type:"get",
	            url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
	            async:true,
	            data:dat,
	            dataType : 'jsonp',       //已经跨域了
	            jsonp:'cb',               //百度的回调函数
	            success:function(res){
	                for(var i=0;i<res.s.length;i++){
	                    resLength=res.s.length;
	                    li=$('<li>'+res.s[i]+'</li>');
	                    $('#second').append(li);
	                };
	
	            },
	            error:function(res){
	                console.log(res)  
	            }
	        });
	    }else{
	        $('#second').html('')    //如果输入框的词都删除了，把获取的数据结果也清空，因为已经获取到数据了，即使阻止再次发送请求也不会把已经获得的数据清除，所以这里直接用了最简单的办法，直接清空数据
	    };	    
	});
	
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
	
	//轮播图的部分
	var timer=null,
		index=0,
		span=$('#page span'),
		li=$('#imglist li');
	//绑定进入事件
	$('#lunbo').bind('mouseenter',function(){
		$('#btn').css({display:'block'});
		clearInterval(timer);
	
	})
	//绑定出去事件
	$('#lunbo').bind('mouseleave',function(){
		$('#btn').css({display:'none'});
		timer=setInterval(function(){
			index++;
			if(index>=3){
				index=0;
			}
			li.eq(index).css({opacity:0}).addClass('show').stop(true).animate({opacity:1},300).
			siblings().animate({opacity:0},200,function(){
				$(this).removeClass('show')
			})
			span.eq(index).addClass('red').siblings().removeClass('red');
			
		},3000)
	})
	//左侧按钮点击事件
	$('#btn #left-btn').bind('click',function(){
		index--;
		if(index<0){
			index=2;
		}
		li.eq(index).css({opacity:0}).addClass('show').stop(true).animate({opacity:1},300).
			siblings().animate({opacity:0},200,function(){
				$(this).removeClass('show')
		})	
		span.eq(index).addClass('red').siblings().removeClass('red');
	})
	//右侧按钮点击事件
	$('#btn #right-btn').bind('click',function(){
		index++;
		if(index>=3){
			index=0;
		}
		li.eq(index).css({opacity:0}).addClass('show').stop(true).animate({opacity:1},300).
			siblings().animate({opacity:0},200,function(){
				$(this).removeClass('show')
		})	
		span.eq(index).addClass('red').siblings().removeClass('red');
	})
	
	//小圆点事件
	span.bind('mouseenter',function(){
		if(!$(this).hasClass('red')){
			var index=$(this).index();
			li.eq(index).css({opacity:0}).addClass('show').stop(true).animate({opacity:1},300).
				siblings().animate({opacity:0},200,function(){
					$(this).removeClass('show')
			})	
			$(this).addClass('red').siblings().removeClass('red');	
		}
	})
	
	//定时器
	timer=setInterval(function(){
			index++;
			if(index>=3){
				index=0;
			}
			li.eq(index).css({opacity:0}).addClass('show').stop(true).animate({opacity:1},300).
			siblings().animate({opacity:0},200,function(){
				$(this).removeClass('show')
			})
			span.eq(index).addClass('red').siblings().removeClass('red');
			
		},3000)
	
	
	//今日新品与一周热销的选项卡
	$('#menu li').bind('click',function(){
		$('#menu li').removeClass('today');
		$(this).addClass('today');
		$('#pannel .pannel').removeClass('week').eq($(this).index()).addClass('week');
	})
	
	//调数据循环创建图片
	//http://simba-api.meilishuo.com/mlselection/top/v1/topGoodsList/h5?callback=jQuery112409043743489310145_1498644034620&type=mrsx&cid=mrsx&offset=0&limit=20&_=1498644034621
	
	var url='http://simba-api.meilishuo.com/mlselection/top/v1/topGoodsList/h5?callback=?&type=mrsx&cid=mrsx&offset=0&limit=10&_=1498644034621'
	$.getJSON(url,function(res){
		//console.log(res);
		var one=$('#pannel #one');
		//var two=$('#pannel #two');
			
			
			var menu=res.data;
			for(var j=0;j<menu.rows.length;j++){
				//创建图片文字的一个个div	
				var divs=$('<div class="pic"></div>');
				one.append(divs);
				
				//提取其中的图片和文字
				var content=menu.rows[j];
				var src=content.image;
				var img = $('<img/>');
				img.attr('src',src)
				divs.append(img);
				
				var $p=$('<p></p>');
				divs.append($p);
				var $a=$('<a></a>'),
					$span=$('<span></span>');
					$p.append($a,$span);
				$a.html('￥'+content.price);
				$span.html(content.collectNum);
				var $h4=$('<h4></h4>');
				divs.append($h4);
				var	$img1=$('<img/>'),
					$p1=$('<p></p>');
				var sc=content.marksUrl;
				$img1.attr('src',sc);
				$p1.html(content.title);
				
				$h4.append($img1);
				$h4.append($p1);
		
			}
//			var menu=res.data;
//			for(var j=0;j<menu.rows.length;j++){
//				//创建图片文字的一个个div	
//				var divs=$('<div class="pic"></div>');
//				two.append(divs);
//				
//				//提取其中的图片和文字
//				var content=menu.rows[j];
//				var src=content.image;
//				var img = $('<img/>');
//				img.attr('src',src)
//				divs.append(img);
//				
//				var $p=$('<p></p>');
//				divs.append($p);
//				var $a=$('<a></a>'),
//					$span=$('<span></span>');
//					$p.append($a,$span);
//				$a.html('￥'+content.price);
//				$span.html(content.collectNum);
//				var $h4=$('<h4></h4>');
//				divs.append($h4);
//				var	$img1=$('<img/>'),
//					$p1=$('<p></p>');
//				var sc=content.marksUrl;
//				$img1.attr('src',sc);
//				$p1.html(content.title);
//				
//				$h4.append($img1);
//				$h4.append($p1);
//		
//			}
	})
	
	//加载更多的图片
	//http://mce.meilishuo.com/jsonp/get/3?callback=jQuery11240955775247188285_1498701499376&offset=0&frame=0&trace=0&limit=10&endId=0&pid=38369&page=1&_=1498701499380
	//首先初始化page
	var nextpage=1;
	var dataList=[];
	//美丽说的ajax函数
	function getData(page){
		var url="http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=1&trace=0&limit=10&endId=0&pid=38369&_=1498713279003";
		//请求数据
		$.ajax({
			type:'get',
			url:url,
			data:{page:page},
			dataType:"jsonp",
			success:function(res){
				res.data.list.forEach(function(v,i){
					var template=
					`<li class="item">
								<img   src="${v.item_pc_img}"/>
								<p><a>￥${v.price}</a><span>${v.itemLikes}</span></p>
								<h4 class="title"><img/><p>${v.title}</p></h4>
							</li>`;
					
					$('#load').append(template);
				})
			}
			
		})
	}
	
	function init(){
		$(window).scroll(function(){
			var scrollTop=$(window).scrollTop();
			var current_max_height=$('#load').height();
			if(current_max_height-scrollTop<500){
				nextpage++;
				getData(nextpage);
			}
		})
		
		getData(nextpage);
	}
	
	init();
	
	$('#sider .s-one').hover(function(){
		$('.weixin').css({display:'block'});
	},function(){
		$('.weixin').css({display:'none'});
	})
	
	
	
	
	
})
