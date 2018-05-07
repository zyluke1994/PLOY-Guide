<?php
//insertAttraction.php
include "../connectdb.php";
$data = json_decode(file_get_contents("php://input"));
$username = $_REQUEST['username'];
$newPassword = $_REQUEST['newPassword'];
$updateType = $_REQUEST['updateType'];
 $firstName = $_REQUEST['firstName'];
    $lastName = $_REQUEST['lastName'];
    $birthday= $_REQUEST['birthday'];
    $email= $_REQUEST['email'];
    $phone= $_REQUEST['phone'];
    $occupancy= $_REQUEST['occupancy'];
    $rating= $_REQUEST['rating'];
    $username= $_REQUEST['username'];
    $password= $_REQUEST['password'];
    $customerNotes= $_REQUEST['customerNotes'];
    $inputBy= $_REQUEST['inputBy'];
    $fullName=$firstName.' '.$lastName;

if(count($data)>0){
    $firstName = mysqli_real_escape_string($connect, $data->firstName);
    $lastName = mysqli_real_escape_string($connect, $data->lastName);
    $birthday= mysqli_real_escape_string($connect, $data->birthday);
    $email= mysqli_real_escape_string($connect, $data->email);
    $phone= mysqli_real_escape_string($connect, $data->phone);
    $occupancy= mysqli_real_escape_string($connect, $data->occupancy);
    $rating= mysqli_real_escape_string($connect, $data->rating);
    $username= mysqli_real_escape_string($connect, $data->username);
    $password= mysqli_real_escape_string($connect, $data->password);
    $customerNotes= mysqli_real_escape_string($connect, $data->customerNotes);
    $inputBy= mysqli_real_escape_string($connect, $data->inputBy);
    //$updateType = mysqli_real_escape_string($connect, $data->updateType);
    $fullName=$firstName.' '.$lastName;
}

if($updateType=="pwchange"){
    $query = "UPDATE customers_ploy SET password = '$newPassword' WHERE username = '$username'";
    if(mysqli_query($connect,$query)){
        echo "Password Updated...";
    }
    else{
        echo "Error...";
    }
}else{
    echo "change password only at this time. URL Params -> updateType=pwchange, username=, newPassword=";
    /*$query = "UPDATE customers_ploy SET firstName = '$firstName', lastName = '$lastName', birthday ='$birthday', email ='$email',
     phone ='$phone', occupancy ='$occupancy', rating ='$rating', customerNotes ='$customerNotes', inputBy='$inputBy', fullName ='$fullName' 
      WHERE username = '$username'";

    
    if(mysqli_query($connect,$query)){
        echo "Data Updated...";
    }
    else{
        echo "Error...";
    }*/
}
//$attractionName = $dbhandle->real_escape_string($data->attractionName);
//$query = "INSERT INTO attractions_ploy (attractionName) VALUES ('$attractionName')";
//$dbhandle->query($query);


?>

