/**
 * Created by Administrator on 2017/7/5 0005.
 */
$(function () {
    //验证手机号
    var phone=$('#text1').html();
    if(!(/^1[34578]\d{9}$/.test(phone))){
        alert('请重新输入正确的手机号');
    }
    //获取验证码
    $('#text3').bind('click',function () {
        var str='';
        for(var i=0;i<6;i++){
            str+=Math.floor(Math.random()*10);
        }
        console.log(str);
        $('#text2').val(str);
    })

    //注册按钮事件
    $('#sub').bind('click',function () {
        if(!$('#text1').val()||!$('#text2').val()){
            alert('请完整信息');
        }else{
            window.location.href="index.html";
        }
    })

})
