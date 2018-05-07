<?php
include "../connectdb.php";
$username = $_GET['username'];
if(!is_null($username)){
    // $attractionID = mysqli_real_escape_string($connect, $attractionID->attractionID);
  $query = "SELECT * FROM customers_ploy WHERE username = '$username'";
   $result = mysqli_query($connect, $query);  

    if(mysqli_num_rows($result) > 0)  
 {  
      while($row = mysqli_fetch_array($result))  
      {  
           $output[] = $row;  
      }  
      echo json_encode($output);  
 }else{
     echo "Error";
 }  
}else{
 //select.php 
 $output = array();  
 $query = "SELECT * FROM customers_ploy";  
 $result = mysqli_query($connect, $query);  
 if(mysqli_num_rows($result) > 0)  
 {  
      while($row = mysqli_fetch_array($result))  
      {  
           $output[] = $row;  
      }  
      echo json_encode($output);  
 } 
};
 ?>  
