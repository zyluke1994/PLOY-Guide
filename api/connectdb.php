<?php
//connectdb.php
 header("Access-Control-Allow-Origin: *");

define("HOSTNAME", "localhost:8889");
define("USERNAME", "test");
define("PASSWORD", "test");
define("DATABASE", "ploy360db");
$connect = mysqli_connect("localhost:8889", "test","test","plan360db");
//$connect = mysqli_connect("localhost", "ylukmamv_plan360","plan360","ylukmamv_ploy") or die("Unable to connect");
?>