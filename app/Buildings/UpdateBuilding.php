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
        
        $buildingID = testInput($_REQUEST['buildingID']);
        $buildingName = testInput($_REQUEST['buildingName']);
        

    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
        $query = $dbh->prepare("UPDATE Building SET buildingName = ".$dbh->quote($buildingName)." WHERE buildingID = ".$buildingID);
        $query->execute();
        
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => true,
                'message' => "The building name was successfully updated.",
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
