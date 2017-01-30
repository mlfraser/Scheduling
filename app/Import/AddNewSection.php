<?php
    /*
     *  AddNewSection.php
     *
     *  This function adds a new section to the database
     *
     *  Returns:        An object indicating success or error
     */
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        include '/itss/local/home/ecescheduling/public_html/resources/functions/validate.php';
        
        //Parameters, with data propery sifted through
        $year = $_REQUEST['year'];
        $courseID = $_REQUEST['courseID'];
        $courseName = $_REQUEST['courseName'];
        $building = $_REQUEST['building'];
        $room = $_REQUEST['room'];
        $capacity = $_REQUEST['capacity'];
        $semester = $_REQUEST['semester'];
        $startTime = $_REQUEST['startTime'];
        $endTime = $_REQUEST['endTime'];
        $crn = $_REQUEST['crn'];
        $sectionName = $_REQUEST['sectionName'];
        $typeID = $_REQUEST['typeID'];
        $credits = $_REQUEST['credits'];
        $days = $_REQUEST['days'];
        $profName = json_decode(stripslashes($_REQUEST['profName']));
        
        //validate data coming in
        if($year == null || $year == "") {
            throw new Exception('The year passed in is not defined', 1);
        }
        if($courseID == null || $courseID == "") {
            throw new Exception('The semester passed in is not defined', 1);
        }
        
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
        
        
        //CHECK IF COURSE EXISTS AND ADD IF NOT
        $exists = $dbh->query("SELECT * FROM Course WHERE courseID = $courseID");
    	if(($exists->rowCount()) <= 0) {
    	    $dbh->query("INSERT INTO Course(courseID, title) VALUES ($courseID, '$courseName')");
    	}
        
        /******************************************************************************************/
        
        //GET/UPDATE ROOM AND BUILDING DATA
        $exists = $dbh->query("SELECT * FROM Room r
    	                       JOIN Building b on b.buildingID = r.buildingID
    	                       WHERE r.roomNumber = $room && b.buildingID = $building");
    	if(($exists->rowCount()) <= 0) {
    	    //Check if building exists
    	    $buildingExists = $dbh->query("SELECT * FROM Building WHERE buildingID = $building");
        	if(($buildingExists->rowCount()) <= 0) {
        	    $dbh->query("INSERT INTO Building(buildingID) VALUES ('$building')");
        	    $buildingExists = $dbh->query("SELECT * FROM Building WHERE buildingID = $building");
        	}
        	
    	    $dbh->query("INSERT INTO Room(roomNumber, buildingID, capacity) VALUES ('$room', '$building', '$capacity')");
    	    $exists = $dbh->query("SELECT * FROM Room r
    	                       JOIN Building b on b.buildingID = r.buildingID
    	                       WHERE r.roomNumber = $room && b.buildingID = $building");
    	}
    	
    	$exists = $exists->fetch();
    	$roomID = $exists["roomID"];
        
        /****************************************************************************************/
        
        //GET SEMESTER DATA
        $exists = $dbh->query("SELECT * FROM Semester WHERE semesterType LIKE '$semester'")->fetch();

    	$semesterID = $exists["semesterID"];
        
        /****************************************************************************************/
        
        //GET START TIME DATA
        $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE '$startTime'");
    	if(($exists->rowCount()) <= 0) {
    	    $dbh->query("INSERT INTO Time(timeStartEnd) VALUES ('$startTime')");
    	    $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE '$startTime'");
    	}
    	$exists = $exists->fetch();
    	$startTimeID = $exists["timeID"];
        
        /****************************************************************************************/
        
        //GET END TIME DATA
        $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE '$endTime'");
    	if(($exists->rowCount()) <= 0) {
    	    $dbh->query("INSERT INTO Time(timeStartEnd) VALUES ('$endTime')");
    	    $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE '$endTime'");
    	}
    	$exists = $exists->fetch();
    	$endTimeID = $exists["timeID"];
        
        /****************************************************************************************/
        
        //ADD SECTION
        $dbh->query("INSERT INTO Section(courseID, CRN, sectionName, startTimeID, endTimeID, roomID, year, semesterID, typeID, credits) VALUES ('$courseID', '$crn', '$sectionName', '$startTimeID', '$endTimeID', '$roomID', '$year', '$semesterID', '$typeID', '$credits')");
    	$sectionID = $dbh->lastInsertID();
        
        /****************************************************************************************/
        
        //ADD DAYS TO SECTION
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
        
        /***************************************************************************************/
        
        //ADD INSTRUCTORS TO SECTION
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
        
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $days,
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
