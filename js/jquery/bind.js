$("#showServiceType").bind('DOMNodeInserted', function(e) {
    var chText = $(e.target).html();
    if(chText == '要显示') {
        $('.serviceTypeClas').css({"display":"block"});
    }else {
        $('.serviceTypeClas').css({"display":"none"});
    }
}); 
