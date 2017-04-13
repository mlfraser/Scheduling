<?php
    /*
     *  GetCourses.php
     *
     *  This function gets the list of courses for each day
     *
     *  Returns:        An object indicating success or error
     *                  Success containing list of course data
     *                  Error containing error object with message
     */
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        include '/itss/local/home/ecescheduling/public_html/resources/functions/validate.php';
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
        $buildings = $dbh->prepare("SELECT * FROM Building ORDER BY buildingID");
        $buildings->execute();
        $buildings = $buildings->fetchAll();
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $buildings,
                'message' => "Buildings were successfully retrieved.",
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
