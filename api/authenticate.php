<?php
include "connectdb.php";
$username = $_REQUEST['username'];
$password = $_REQUEST['password'];

$data = json_decode(file_get_contents("php://input"));
 $output = array();  
if(count($data)>0){
    $username = mysqli_real_escape_string($connect, $data->username);
    $password = mysqli_real_escape_string($connect, $data->password);
        $updateType = mysqli_real_escape_string($connect, $data->updateType);
        $signupUsername = mysqli_real_escape_string($connect, $data->signupUsername);
        $signupPassword = mysqli_real_escape_string($connect, $data->signupPassword);
        $signupFullName = mysqli_real_escape_string($connect, $data->signupFullName);
                $signupActivationKey = mysqli_real_escape_string($connect, $data->signupActivationKey);


  
}
//login
if(!is_null($username)&& $updateType!="signup"){
  $query = "SELECT * FROM authenticate_ploy WHERE username = '$username' AND password =  '$password'";
   $result = mysqli_query($connect, $query);  
    if(mysqli_num_rows($result) > 0)  
 {  

      while($row = mysqli_fetch_array($result))  
      {  
           $output[] = $row;  
      }  
      echo json_encode($output);  
 } else{
     echo "Username or Password Incorrect";
 } 
};

//issue activation key
$activationKey = $_REQUEST['activationKey'];
$keyGivenBy = $_REQUEST['keyGivenBy'];
$role = $_REQUEST['role'];

if(!is_null($activationKey)){
         echo "inserting activationkey";

$query = "INSERT INTO authenticate_ploy (activationKey, keyGivenBy, role) 
     VALUES ('$activationKey','$keyGivenBy', '$role')";
    if(mysqli_query($connect,$query)){
        echo "Key Inserted...";
    }
    else{
        echo "Error...";
    }
}

//signup
if($updateType=="signup"){
$query = "SELECT * FROM authenticate_ploy WHERE activationKey = '$signupActivationKey'";
     $result = mysqli_query($connect, $query);  
    if(mysqli_num_rows($result) === 1)  
 {  
$query = "UPDATE authenticate_ploy SET username = '$signupUsername', password = '$signupPassword', name ='$signupFullName' WHERE activationKey = '$signupActivationKey'";
    if(mysqli_query($connect,$query)){
        echo "You have successfully signed up - Please proceed with login.";
    }
    else{
        echo("Error description: " . mysqli_error($connect));

    }
      
 } else{
        echo "Invalid Activation Key";
 } ;




}




 ?>  
