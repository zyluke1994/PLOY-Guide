<?php
//insertPlan.php
include "../connectdb.php";
$data = json_decode(file_get_contents("php://input"));

if(count($data)>0){
    $customerID = mysqli_real_escape_string($connect, $data->customerID);
    $customerName = mysqli_real_escape_string($connect, $data->customerName);
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

    $query = "INSERT INTO planToCustomer_ploy (customerID, customerName, tripName, tripStart, tripEnd,
     tripOrigin,tripStops, tripFinalDestination, planStart, planDeadline,notes,inputBy) 
     VALUES ('$customerID','$customerName','$tripName','$tripStart','$tripEnd','$tripOrigin','$tripStops','$tripFinalDestination','$planStart','$planDeadline','$notes','$inputBy')";
    if(mysqli_query($connect,$query)){
        echo "Data Inserted...";
    }
    else{
        echo "Error...";
    }
}

?>

