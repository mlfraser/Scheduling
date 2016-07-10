<?php
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        $semester = json_decode(stripslashes($_POST['semester']));
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
    	
    	$exists = $dbh->query("SELECT * FROM Semester WHERE semesterType LIKE '$semester'")->fetch();

    	echo $exists["semesterID"];
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
