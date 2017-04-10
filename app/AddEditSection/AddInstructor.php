<?php
    /*
     *  AddInstructor.php
     *
     *  This function adds a new instructor to the database
     *
     *  Returns:        An object indicating success or error
     */
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        include '/itss/local/home/ecescheduling/public_html/resources/functions/validate.php';
        
        //Parameters, with data propery sifted through
        
        $instructor = testInput($_REQUEST['instructor']);
        
        
        
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
        if(!isset($instructor) || $instructor == "") {
            throw new Exception("The instructor name passed in is not defined", 0);
        }
        
        
        //CHECK IF COURSE EXISTS AND ADD IF NOT
        $exists = $dbh->query("SELECT * FROM Instructor WHERE name LIKE ".$dbh->quote($instructor));
    	if(($exists->rowCount()) > 0) {
    	    throw new Exception("The instructor name entered already exists.", $exists->fetch()["instructorID"]);
    	}

        $dbh->query("INSERT INTO Instructor(name) VALUES (".$dbh->quote($instructor).")");
        $exists = $dbh->query("SELECT * FROM Instructor WHERE name LIKE ".$dbh->quote($instructor));
    	if(($exists->rowCount()) < 0) {
    	    throw new Exception("There was an error in adding the instructor.", 0);
    	}
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $exists->fetch()["instructorID"],
                'message' => "The instructor was successfully added.",
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
