<?php
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        $courseID = json_decode(stripslashes($_POST['courseID']));
        $courseName = json_decode(stripslashes($_POST['courseName']));
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
    	
    	$exists = $dbh->query("SELECT * FROM Course WHERE courseID = $courseID");
    	if(($exists->rowCount()) <= 0) {
    	    $dbh->query("INSERT INTO Course(courseID, title) VALUES ($courseID, '$courseName')");
    	}
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
