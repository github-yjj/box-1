<?php
header("Content-type:text/html;Charset=utf-8");
include("../lib/MMySQL.php");

// 数据库的基本设置
$config_arr = [
	"host"=>"127.0.0.1",
	"port"=>"3306",
	"user"=>"root",
	"passwd"=>"",
	"dbname"=>"stu_04"
];

$conn = new MMysql($config_arr);

$user_id = $_GET['id'];


$sql = "select username from user where id=".$user_id;

$res = $conn->doSql($sql);

$user = $res[0]['username'];

echo  $user;