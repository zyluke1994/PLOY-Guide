<?php
//insertAttraction.php
include "../connectdb.php";
$data = json_decode(file_get_contents("php://input"));
//$attractionName = $dbhandle->real_escape_string($data->attractionName);
//$query = "INSERT INTO attractions_ploy (attractionName) VALUES ('$attractionName')";
//$dbhandle->query($query);
if(count($data)>0){
        $planID = mysqli_real_escape_string($connect, $data->planID);
    $tripName = mysqli_real_escape_string($connect, $data->tripName);
    $tripStart= mysqli_real_escape_string($connect, $data->tripStart);
    $tripEnd= mysqli_real_escape_string($connect, $data->tripEnd);
    $tripOrigin= mysqli_real_escape_string($connect, $data->tripOrigin);
    $tripStops= mysqli_real_escape_string($connect, $data->tripStops);
    $tripFinalDestination= mysqli_real_escape_string($connect, $data->tripFinalDestination);
    $planStart= mysqli_real_escape_string($connect, $data->planStart);
    $planDeadline= mysqli_real_escape_string($connect, $data->planDeadline);
    $notes= mysqli_real_escape_string($connect, $data->notes);
    $inputBy= mysqli_real_escape_string($connect, $data->inputBy);

    $query = "UPDATE planToCustomer_ploy SET tripName = '$tripName', tripStart = '$tripStart', tripEnd ='$tripEnd', tripOrigin ='$tripOrigin',
     tripStops ='$tripStops', tripFinalDestination ='$tripFinalDestination', planStart ='$planStart', planDeadline ='$planDeadline', notes='$notes', inputBy ='$inputBy' 
      WHERE planID = '$planID'";
    
    if(mysqli_query($connect,$query)){
        echo "Data Updated...";
    }
    else{
        echo "Error...";
    }
}

?>

