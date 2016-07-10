<?php
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        $sectionID = json_decode(stripslashes($_POST['sectionID']));
        $days = json_decode(stripslashes($_POST['days']));
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
    	
    	foreach(str_split($days) as $day)
    	{
        	//Get instructorID
        	$exists = $dbh->query("SELECT * FROM Day WHERE dayLetter LIKE '$day'");
        	if(($exists->rowCount()) <= 0)
        	{
        	    $dbh->query("INSERT INTO Day(dayLetter) VALUES ('$day')");
        	    $exists = $dbh->query("SELECT * FROM Day WHERE dayLetter LIKE '$day'");
        	}
        	$exists = $exists->fetch();
        	$dayID = $exists['dayID'];
        	$dbh->query("INSERT INTO SectionDayMapping(sectionID, dayID) VALUES ('$sectionID', '$dayID')");
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
