<?php 
    $user = $_POST['userkey'];
    $payload = $_POST['payload'];

    if($user == null){
        echo "failed:nousertoken";
        die();
    }

    //make directory for user
    mkdir('data/' . $user , 0777, true);

    //backup old data
    if(file_exists('data/' . $user . "/data.json")){
        rename('data/' . $user . "/data.json", 'data/' . $user . "/data_". date('Y-m-d-His') .".json");
    }

    //save data
    file_put_contents('data/' . $user . "/data.json", Json_encode($payload));

    //delete older audits
    $files = glob('data/' . $user . "/*.json");
    rsort($files);

    $count = 0;
    foreach ($files as $filename)
    {
        if(strpos($filename, "data.json") !== false)
            continue;

        $count++;
        if($count > 100)
            unlink($filename);
    }