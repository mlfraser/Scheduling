<?php
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        $building = json_decode(stripslashes($_POST['building']));
        $room = json_decode(stripslashes($_POST['room']));
        $capacity = json_decode(stripslashes($_POST['roomSize']));
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
    	
    	$exists = $dbh->query("SELECT * FROM Room r
    	                       JOIN Building b on b.buildingID = r.buildingID
    	                       WHERE r.roomNumber = $room && b.buildingID = $building");
    	if(($exists->rowCount()) <= 0) {
    	    //Check if building exists
    	    $buildingExists = $dbh->query("SELECT * FROM Building WHERE buildingID = $building");
        	if(($buildingExists->rowCount()) <= 0) {
        	    $dbh->query("INSERT INTO Building(buildingID) VALUES ('$building')");
        	    $buildingExists = $dbh->query("SELECT * FROM Building WHERE buildingID = $building");
        	}
        	
    	    $dbh->query("INSERT INTO Room(roomNumber, buildingID, capacity) VALUES ('$room', '$building', '$capacity')");
    	    $exists = $dbh->query("SELECT * FROM Room r
    	                       JOIN Building b on b.buildingID = r.buildingID
    	                       WHERE r.roomNumber = $room && b.buildingID = $building");
    	}
    	
    	$exists = $exists->fetch();
    	echo $exists["roomID"];
    }
    catch(Exception $e)
    {
        echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ),
    ));
    }

?>
