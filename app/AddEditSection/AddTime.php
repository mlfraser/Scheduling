<?php
    /*
     *  AddTime.php
     *
     *  This function adds a new time to the database
     *
     *  Returns:        An object indicating success or error
     */
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        include '/itss/local/home/ecescheduling/public_html/resources/functions/validate.php';
        
        //Parameters, with data propery sifted through
        
        $time = testInput($_REQUEST['time']);
        
        
        
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
        if(!isset($time) || $time == "") {
            throw new Exception("The time passed in is not defined", 0);
        }
        $fullTime = formatTime($time);
        
        
        //CHECK IF COURSE EXISTS AND ADD IF NOT
        $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE ".$dbh->quote($time));
    	if(($exists->rowCount()) > 0) {
    	    throw new Exception("The time entered already exists.", $exists->fetch()["timeID"]);
    	}

        $dbh->query("INSERT INTO Time(timeStartEnd, fullTime) VALUES (".$dbh->quote($time).", ".$dbh->quote($fullTime).")");
        $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE ".$dbh->quote($time));
    	if(($exists->rowCount()) < 0) {
    	    throw new Exception("There was an error in adding the time.", 0);
    	}
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $exists->fetch()["timeID"],
                'message' => "The time was successfully added.",
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

    function formatTime($time) {
        
        if(substr($time, 6, 2) == "am" && substr($time, 0, 2) == "12") {
            return "00:".substr($time, 3, 2);
        }
        else if(substr($time, 6, 2) == "pm" && substr($time, 0, 2) == "12") {
            return substr($time, 0, 5);
        }
        else if(substr($time, 6, 2) == "pm") {
            return (intval(substr($time, 0, 2)) + 12).substr($time, 2, 3);
        }
        else{
            return substr($time, 0, 5);
        }
        
    }

?>
