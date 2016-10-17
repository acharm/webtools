function Num(obj){
    obj.value = obj.value.replace(/[^\d.]/g,"");    // 清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g,"");       // 验证第一个字符是数字而不是"."
    obj.value = obj.value.replace(/\.{2,}/g,".");   // 只保留第一个"." 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); // 只能输入两个小数
}


// 只能输入数字
function OnlyNum(obj){
   obj.value = obj.value.replace(/[^\d]/g, ''); // 清除"数字"和"."以外的字符 
}

// useed in line like this
// <input type="text" id="quantity" onkeyup="OnlyNum(this)" onblur="OnlyNum(this)" />
// <input type="text"  id="price" name="" class="" value="" readOnly title="" style="" onkeyup="Num(this)" onblur="Num(this);value=(value==''?'':parseFloat(value))"/>
