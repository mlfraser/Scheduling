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
        
        $query = $dbh->prepare("SELECT * FROM Course ORDER BY courseID");
        $query->execute();
        $courses = $query->fetchAll();
        
        $query = $dbh->prepare("SELECT * FROM Time ORDER BY fullTime");
        $query->execute();
        $times = $query->fetchAll();
        
        $query = $dbh->prepare("SELECT * FROM Semester ORDER BY semesterType");
        $query->execute();
        $semesters = $query->fetchAll();
        
        $query = $dbh->prepare("SELECT * FROM Instructor ORDER BY name");
        $query->execute();
        $instructors = $query->fetchAll();
        
        $query = $dbh->prepare("SELECT * FROM Day LIMIT 5");
        $query->execute();
        $days = $query->fetchAll();
        
        $query = $dbh->prepare("SELECT * FROM Room r
                                JOIN Building b on r.buildingID = b.buildingID");
        $query->execute();
        $rooms = $query->fetchAll();
        
        
        $data = array(
            'Courses' => $courses,
            'Times' => $times,
            'Semesters' => $semesters,
            'Rooms' => $rooms,
            'Instructors' => $instructors,
            'Days' => $days
        );
        
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $data,
                'message' => "Instructors were successfully retrieved.",
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
