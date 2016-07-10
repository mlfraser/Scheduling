<?php
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        $crn = json_decode(stripslashes($_POST['crn']));
        $sectionName = json_decode(stripslashes($_POST['sectionName']));
        $courseID = json_decode(stripslashes($_POST['courseID']));
        $startTimeID = json_decode(stripslashes($_POST['startTimeID']));
        $endTimeID = json_decode(stripslashes($_POST['endTimeID']));
        $roomID = json_decode(stripslashes($_POST['roomID']));
        $typeID = json_decode(stripslashes($_POST['typeID']));
        $credits = json_decode(stripslashes($_POST['credits']));
        $semesterID = json_decode(stripslashes($_POST['semesterID']));
        $year = json_decode(stripslashes($_POST['year']));
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
    	
    	$dbh->query("INSERT INTO Section(courseID, CRN, sectionName, startTimeID, endTimeID, roomID, year, semesterID, typeID, credits) VALUES ('$courseID', '$crn', '$sectionName', '$startTimeID', '$endTimeID', '$roomID', '$year', '$semesterID', '$typeID', '$credits')");
    	echo $dbh->lastInsertID();
    	
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
