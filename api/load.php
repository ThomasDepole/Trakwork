<?php 
    $user = $_GET['userkey'];

    if($user == null){
        echo "failed:nousertoken";
        die();
    }

    if(file_exists('data/' . $user . "/data.json") == false){
        echo "failed:no data for user";
        die();
    }
    
    echo file_get_contents('data/' . $user . "/data.json");