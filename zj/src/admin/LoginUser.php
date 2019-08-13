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

$username = $_POST['username']?$_POST['username'] : "";
$password = $_POST['password']? $_POST['password']: "";


// 用户名和密码是否为空 ==》前端 --》

if($username === "" || $password === ""){
	$message = ["state"=>0,"error_msg"=>"用户名和密码不能为空"];
}else {

	$sql = "select * from user where username='" . $username ."';";

	$result = $conn->doSql($sql);
	if(!$result){
		$message = ["state"=>0,"error_msg"=>"用户名不存在"];
	}else{
		//$sql = "select password from user where username='".$username."';";
		// var_dump($result[0]['password']);
		// 密码 
		if(md5($password) === $result[0]['password']){
			$message = ["state"=>1,"error_msg"=>""];
		}else {
			$message = ["state"=>0,"error_msg"=>"密码错误"];
		}
	}

}


echo json_encode($message);