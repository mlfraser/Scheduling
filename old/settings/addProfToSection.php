<?php
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        $sectionID = json_decode(stripslashes($_POST['sectionID']));
        $profName = json_decode(stripslashes($_POST['profName']));
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
    	
    	foreach($profName as $name)
    	{
        	//Get instructorID
        	$exists = $dbh->query("SELECT * FROM Instructor WHERE name LIKE '$name'");
        	if(($exists->rowCount()) <= 0)
        	{
        	    $dbh->query("INSERT INTO Instructor(name) VALUES ('$name')");
        	    $exists = $dbh->query("SELECT * FROM Instructor WHERE name LIKE '$name'");
        	}
        	$exists = $exists->fetch();
        	$instructorID = $exists['instructorID'];
        	$dbh->query("INSERT INTO SectionInstructorMapping(sectionID, instructorID) VALUES ('$sectionID', '$instructorID')");
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
