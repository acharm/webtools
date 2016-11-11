
<?php


$TEST_URL = 'http://test.wavecare.cn/cnpcmall/vop/router';
$TEST_KEY = '88888';
$TEST_SEC = 'abcdeabcdeabcdeabcdeabcde';

function post2($url, $data) {//file_get_content
    $postdata = http_build_query(
        $data
    );

    $opts = array('http' =>
                  array(
                      'method'  => 'POST',
                      'header'  => 'application/octet-stream',
                      'content' => $postdata
                  )
    );

    $context = stream_context_create($opts);
    $result = file_get_contents($url, false, $context);
echo "\n<br/>".$result;
    return $result;
}
    
//getReqParam($TEST_KEY, $TEST_SEC);
function getReqParam($TEST_KEY, $TEST_SEC, $TEST_URL) {
	$data['pointCode'] = 'pointCode';
	$data['engineerId'] = 'U0001';
	$data['wxOpenId'] = '123456789';
	$data['wxNickName'] = '小微';
	
	$req['a'] = $TEST_KEY;
	$req['f'] = 'json';
	$req['l'] = 'zh_CN';
	$req['m'] = 'biz.order.receive.wechat';
	$req['v'] = '1.0';
	$req['i'] = time();
	echo($data['wxNickName']);
	// $req['params'] = json_encode($data, JSON_UNESCAPED_UNICODE);
	$req['params'] = '{"pointCode":"ZDA11","engineerId":"U0001","wxOpenId":"123456789","wxNickName":"小微"}';
	
	$req['s'] = sign($req, null, $TEST_SEC);
	
	post2($TEST_URL, $req);
}

//生成签名
function sign($paramValues, $ignoreParamNames, $secret) {

	$arrLen = count($ignoreParamNames);
	$paramTemp;
	foreach($paramValues as $k => $v) {
		if($arrLen > 0) {
			for($i=0; $i < $arrLen; $i++) { 
				if($ignoreParamNames[$i] != $k) {
					$paramTemp[$k] = $v;
				}
			}
		}else {
			$paramTemp[$k] = $v;
		}
	}
	
	$str = $secret;
	ksort($paramTemp);
	foreach($paramTemp as $key => $value) {// echo("\n");echo($key."=====".$value);
		$str .= $key.$value;
	}
	$str .= $secret;
 echo "\n<br/>".$str;
    $sign = strtoupper(Sha1($str)); 
    echo "\n<br/>".$sign;
    return $sign;
}
?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

<?php
	echo(getReqParam($TEST_KEY, $TEST_SEC,$TEST_URL));

	echo(md5("11"));
?>

</body>
</html>
