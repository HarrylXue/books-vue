<?php 
	@$type = $_REQUEST['type'];
	@$str='';
	if ($type == 'channel') {
		$str = file_get_contents('http://way.jd.com/jisuapi/channel?appkey=6f99739743782d29c0b79f06cece3dde');
	}elseif ($type == 'newsList') {
		@$channel = $_REQUEST['channel'];
		@$pageSize = $_REQUEST['pagesize'];//数量
		@$pageNo = $_REQUEST['pageNo'];
		$str = file_get_contents('http://way.jd.com/jisuapi/get?channel='.$channel.'&num='.$pageSize.'&start='.$pageNo.'&appkey=6f99739743782d29c0b79f06cece3dde');
	}elseif ($type == 'newSearch') {
		@$keyWord = $_REQUEST['keyword'];
		$str = file_get_contents('http://way.jd.com/jisuapi/newSearch?keyword='.$keyword.'&appkey=6f99739743782d29c0b79f06cece3dde');
	}

	echo "$str";
?>