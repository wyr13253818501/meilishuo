$(function(){
	//
	$('.bc').hover(function(){
		$('.bc-five').css({background:'url(img/w55.jpg) no-repeat 10px 18px'});
		$('.hide').css({display:'block'})
	},function(){
		$('.bc-five').css({background:'url(img/w54.jpg) no-repeat 10px 18px'});
		$('.hide').css({display:'none'})
	})
	
	//
	$('#thumb-box img').click(function(){
		$('#thumb-box img').removeClass('active');
		var src = $(this).attr('src');
		//console.log(src);
		$(".middle-img").attr("src",src);
		$(this).addClass("active").siblings().removeClass("active")//为了区分当前小图片，为其加一个class
		 
	})
	
	//
	var num=$('.f-two').text();
	$('.f-one').bind('click',function(){
		num--;
		if(num<1){
			num=1;
		}
		$('.f-two').html(num);		
	})
	$('.f-three').bind('click',function(){
		num++;
		$('.f-two').html(num);
	})
	
	
	
	
	//
	var url="look.json";
	$.get(url,function(res){
		//console.log(res);
		var menu=res.list;
		for(var i=0;i<menu.length;i++){
			//创建小块的div
			var divs=$('<div class="img-list"></div>');
			$('.img').append(divs);
			var content=menu[i];
			//小块div里的图片
			var imgs=$('<img/>');
			var src=content.image;
			imgs.attr('src',src);
			divs.append(imgs);
			
			var $p=$('<p></p>');
			divs.append($p);
			$p.html(content.title);
						
			var $a=$('<a></a>');
			divs.append($a);
			$a.html('￥'+content.price);
			
			var $span=$('<span></span>');
			divs.append($span);
			$span.html(content.itemsLikes);
		}
	})
	
	//选项卡应首先清除选卡列表的所有选卡的class,再让当前的选卡添加class，
	//内容列表全部移除class，对应位置的内容列表添加class
	$('.c-list li').bind('click',function(){
		$('.c-list li').removeClass('active');
		$(this).addClass('active');
		$('#pannel .pannel').removeClass('week').eq($(this).index()).addClass('week');
	})
	
	
	//
	$("#cm-one").next("a").hide();
    $("#cm-one").click(function()
    {
     $(this).next("a").toggle();
    });
	
	
	//
	var url="common.json";
	$.get(url,function(res){
		console.log(res);
		var menu=res.list;
		for(var j=0;j<menu.length;j++){
			//创建小块的div
			var divs=$('<div class="img-list"></div>');
			$('#pic').append(divs);
			var content=menu[j];
			//小块div里的图片
			var imgs=$('<img/>');
			var src=content.image;
			imgs.attr('src',src);
			divs.append(imgs);
			
			var $p=$('<p></p>');
			divs.append($p);
			$p.html(content.title);
						
			var $a=$('<a></a>');
			divs.append($a);
			$a.html('￥'+content.price);
			
			var $span=$('<span></span>');
			divs.append($span);
			$span.html(content.itemsLikes);
		}
	})
	
	//
	var url="商品详情.json";
	$.get(url,function(res){
		var open=res.list;
		for(var k=0;k<open.length;k++){
			var $imgs=$('<img/>');
			$('.effect').append($imgs);
			var content=open[k];
			var src=content.img;
			$imgs.attr('src',src);
		}
	})
	
	
	
	$('.good-add').bind('click',function(){
		var prodcutObj = {
				title: $("#good-title").html(),
				price: $("#good-price").html(),
				src:  $("#good-img").attr('src')
			};
		//先创建一个对象保存当前的产品信息
		var cartsStr=getCookie('carts');
		if(cartsStr == undefined){
                    //购物车中没有商品
                    prodcutObj.num = 1;
                    var arr = [prodcutObj];
                    var jsonStr = JSON.stringify(arr);
                    setCookie('carts',jsonStr,30)
                }else{
                    //购物车中有商品   需要去判断 要添加的商品 是否在购物车中 
                    // 要添加的商品 prodcutObj
                    //cartsStr
                    var arr = JSON.parse(cartsStr);
                    var flag  = false;
                    var index = 0;
                    for(var i=0;i<arr.length;i++){
                        var tmp = arr[i];
                        if(tmp.pid == prodcutObj.pid){
                            flag = true;
                            index = i;
                        }
                    }
                    if(flag == true){
                        //购物车中存在相同的商品
                        arr[index].num++;
                    }else {
                        //购物车中不存在相同的商品
                        prodcutObj.num = 1;
                        arr.push(prodcutObj)
                    }
                    var jsonStr = JSON.stringify(arr);
                    setCookie('carts',jsonStr,30)
                }



            })


	
	
	
	
	
})
