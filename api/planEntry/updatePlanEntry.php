<?php
//insertAttraction.php
include "../connectdb.php";
$data = json_decode(file_get_contents("php://input"));
$visitStart = $_REQUEST['visitStart'];
$visitEnd = $_REQUEST['visitEnd'];
$previousAttractionID = $_REQUEST['previousAttractionID'];
 $timeToTravel = $_REQUEST['timeToTravel'];
    $planID = $_REQUEST['planID'];
    $inputBy= $_REQUEST['inputBy'];
    $planEntryMemo= $_REQUEST['planEntryMemo'];
   $updateType = $_REQUEST['updateType'];
   $entryID = $_REQUEST['entryID'];


if(count($data)>0){
    $visitStart = mysqli_real_escape_string($connect, $data->visitStart);
    $visitEnd = mysqli_real_escape_string($connect, $data->visitEnd);
    $entryID = mysqli_real_escape_string($connect, $data->entryID);
        $updateType = mysqli_real_escape_string($connect, $data->updateType);

}

if($updateType=="updateTime"){
    $query = "UPDATE planEntry_ploy SET visitStart = '$visitStart', visitEnd = '$visitEnd', inputBy ='Test2' WHERE entryID = '$entryID'";
    if(mysqli_query($connect,$query)){
        echo "Entry Updated...";
    }
    else{
        echo "Error...";
    }
}else{
    echo "change time only at this time. ";
}


?>

