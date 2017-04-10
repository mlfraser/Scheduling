<?php
    /*
     *  AddCourse.php
     *
     *  This function adds a new course to the database
     *
     *  Returns:        An object indicating success or error
     */
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        include '/itss/local/home/ecescheduling/public_html/resources/functions/validate.php';
        
        //Parameters, with data propery sifted through
        
        $courseID = testInput($_REQUEST['courseID']);
        $courseName = testInput($_REQUEST['title']);
        
        
        
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
        
        
        //CHECK IF COURSE EXISTS AND ADD IF NOT
        $exists = $dbh->query("SELECT * FROM Course WHERE courseID = $courseID");
    	if(($exists->rowCount()) > 0) {
    	    throw new Exception("A course already exists under this course number.", 1);
    	}

        $dbh->query("INSERT INTO Course(courseID, title) VALUES ($courseID, '$courseName')");
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $courseID,
                'message' => "The course was successfully added.",
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
