/**
 * Created by jameswatt2008 on 2017/6/1.
 */
// 增加/修改cookie函数：
function setCookie(name,value,iDay){
    var newDate = new Date();
    newDate.setDate(newDate.getDate()+iDay);
    document.cookie=name+"="+value+";expires="+newDate;
}
// setCookie("user","andy",7);
// 获取cookie函数：
//username=zhangsan; password=1234; asdfadf=adsfadf
function getCookie(name){
    var arr = document.cookie.split("; ");
    for(var i =0; i<arr.length; i++){
        var arr2 = arr[i].split("=");
        if(arr2[0] == name){
            return arr2[1];
        }
    }
}
// 删除cookie函数：
function removeCookie(name){
    setCookie(name,'',-100);
}