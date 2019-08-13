<?php
header("Content-type:text/html;Charset=utf-8");
include("MMySQL.php");

// 数据库的基本设置
$config_arr = [
	"host"=>"127.0.0.1",
	"port"=>"3306",
	"user"=>"root",
	"passwd"=>"",
	"dbname"=>"stu_04"
];

$conn = new MMysql($config_arr);

// 接收数据 
$username = $_POST['username'] ? $_POST['username'] : "";


// 判断密码是否为空 用户名是否为空 
if($username === ""){
	$message = ["state"=>0,"error_msg"=>"用户名或者密码不能为空!"];
}else {
	// 设置sql  
	$sql = "select * from user where username='" . $username ."';";
	// select * from user where username='zhangsan';
	$result = $conn->doSql($sql);

	if(!$result){
		$message = ["state"=>1,"error_msg"=>""];

	}else {
		$message = ["state"=>0,"error_msg"=>"用户名已被注册"];
	}

}


// 转换成json输出
echo json_encode($message);
