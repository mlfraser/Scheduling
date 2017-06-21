<?php
    /*
     *  AddRoom.php
     *
     *  This function adds a new room to the database
     *
     *  Returns:        An object indicating success or error
     */
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        include '/itss/local/home/ecescheduling/public_html/resources/functions/validate.php';
        
        //Parameters, with data propery sifted through
        
        $roomNumber = testInput($_REQUEST['roomNumber']);
        $buildingID = testInput($_REQUEST['buildingNumber']);
        $capacity = testInput($_REQUEST['capacity']);
        $isLab = testInput($_REQUEST['isLab']);
        
        
        
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
         //GET/UPDATE ROOM AND BUILDING DATA
            $exists = $dbh->query("SELECT * FROM Room r
                                   JOIN Building b on b.buildingID = r.buildingID
                                   WHERE r.roomNumber = '$roomNumber' AND b.buildingID = $buildingID");

            if(($exists->rowCount()) > 0) {
                throw new Exception("The room already exists.", $exists->fetch()["roomID"]);
            }
        
            //Check if building exists
            $buildingExists = $dbh->query("SELECT * FROM Building WHERE buildingID = $buildingID");
            if(($buildingExists->rowCount()) <= 0) {
                $dbh->query("INSERT INTO Building(buildingID) VALUES ($buildingID)");
                $buildingExists = $dbh->query("SELECT * FROM Building WHERE buildingID = $buildingID");
            }
            if(!isset($capacity)) $capacity = 0;

            $dbh->query("INSERT INTO Room(roomNumber, buildingID, capacity, isLab) VALUES ('$roomNumber', '$buildingID', '$capacity', $isLab)");
            $exists = $dbh->query("SELECT * FROM Room r
                               JOIN Building b on b.buildingID = r.buildingID
                               WHERE r.roomNumber = '$roomNumber' AND b.buildingID = $buildingID");
            
            $exists = $exists->fetch();
            $room = array(
                'roomID' => $exists["roomID"],
                'buildingName' => $exists["buildingName"]
            );
        
        
        
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $room,
                'message' => "The room was successfully added.",
            ),
        ));
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
