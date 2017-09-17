$(function(){
	//取出cookie里的内容
	var $list=$('.good-list');
	var jsonStr = getCookie('carts');
	if(jsonStr==undefined){
		//没有商品添加
	}else{
		//有商品添加
		var arr=JSON.parse(jsonStr);
		for(var i=0;i<arr.length;i++){
			var prodcutObj = arr[i];
			var $li=$('<li></li>');
			$list.append($li);
			
			var $img=$('<img/>');
			$li.append($img);
			$img.attr('src',prodcutObj.src);
			
			$p=$('<p></p>');
			$li.append($p);
			$p.html(prodcutObj.title);
			
			$div1=$('<div></div>');
			$li.append($div1);
			$div1.html(prodcutObj.price);

            $remove = $('<button>-</button>');
            $li.append($remove);

            $num = $('<input/>');
            $num.val(prodcutObj.num);
            $li.append($num);

            $add = $('<button>+</button>');
            $li.append($add);

            $a = $('<a>删除</a>');
            $li.append($a);

			//点击删除移除cookie
			$a.bind('click',function () {
				$li.css('display','none');
				removeCookie('carts');
            })


			//点击增加
			$add.bind('click',function () {
                prodcutObj.num++;
                $num.val(prodcutObj.num);
                setCookie('carts',jsonStr,30);
            })

			//点击减少
			$remove.bind('click',function () {
                prodcutObj.num--;
				if(prodcutObj.num==0){
                    $li.css('display','none');
                    removeCookie('carts');
				}
                $num.val(prodcutObj.num);
                setCookie('carts',jsonStr,30);
            })



		}
	}
})
