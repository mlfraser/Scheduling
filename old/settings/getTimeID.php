<?php
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        $time = json_decode(stripslashes($_POST['time']));
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
    	
    	$exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE '$time'");
    	if(($exists->rowCount()) <= 0) {
    	    $dbh->query("INSERT INTO Time(timeStartEnd) VALUES ('$time')");
    	    $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE '$time'");
    	}
    	$exists = $exists->fetch();
    	echo $exists["timeID"];
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
