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
        $year = testInput($_REQUEST['year']);
        $courseID = testInput($_REQUEST['courseID']);
        $courseName = testInput($_REQUEST['courseName']);
        $buildingID = $REQUEST['building'];
        $room = testInput($_REQUEST['room']);
        $roomID = testInput($_REQUEST['roomID']);
        $capacity = testInput($_REQUEST['capacity']);
        $semester = testInput($_REQUEST['semester']);
        $semesterID = testInput($_REQUEST['semesterID']);
        $startTime = testInput($_REQUEST['startTime']);
        $endTime = testInput($_REQUEST['endTime']);
        $startTimeID = testInput($_REQUEST['startTimeID']);
        $endTimeID = testInput($_REQUEST['endTimeID']);
        $crn = testInput($_REQUEST['crn']);
        $sectionName = testInput($_REQUEST['sectionName']);
        $sectionTitle = testInput($_REQUEST['sectionTitle']);
        $sectionID = testInput($_REQUEST['sectionID']);
        $typeID = testInput($_REQUEST['typeID']);
        $isLab = testInput($_REQUEST['isLab']);
        $credits = testInput($_REQUEST['credits']);
        $days = testInput($_REQUEST['days']);
        $profName = json_decode(stripslashes($_REQUEST['profName']));
        
        
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
        if($roomID == "" || $roomID == null || !isset($roomID)) {
            //GET/UPDATE ROOM AND BUILDING DATA
            $exists = $dbh->query("SELECT * FROM Room r
                                   JOIN Building b on b.buildingID = r.buildingID
                                   WHERE r.roomNumber = $room && b.buildingID = $buildingID");
            
            if(($exists->rowCount()) <= 0) {
                //Check if building exists
                $buildingExists = $dbh->query("SELECT * FROM Building WHERE buildingID = $buildingID");
                if(($buildingExists->rowCount()) <= 0) {
                    $dbh->query("INSERT INTO Building(buildingID) VALUES ('$buildingID')");
                    $buildingExists = $dbh->query("SELECT * FROM Building WHERE buildingID = $buildingID");
                }
                if(!isset($capacity)) $capacity = 0;

                $dbh->query("INSERT INTO Room(roomNumber, buildingID, capacity) VALUES ('$room', '$buildingID', '$capacity')");
                $exists = $dbh->query("SELECT * FROM Room r
                                   JOIN Building b on b.buildingID = r.buildingID
                                   WHERE r.roomNumber = $room && b.buildingID = $buildingID");
            }
            $exists = $exists->fetch();
    	   $roomID = $exists["roomID"];
        }
    	
        
        /****************************************************************************************/
        if($semesterID == "" || $semesterID == null || !isset($semesterID)){
            //GET SEMESTER DATA
            $exists = $dbh->query("SELECT * FROM Semester WHERE semesterType LIKE '$semester'")->fetch();

            $semesterID = $exists["semesterID"];
        }
        /****************************************************************************************/
        if($startTimeID == "" || $startTimeID == null || !isset($startTimeID)){
            //GET START TIME DATA
            $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE '$startTime'");
            if(($exists->rowCount()) <= 0) {
                $dbh->query("INSERT INTO Time(timeStartEnd) VALUES ('$startTime')");
                $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE '$startTime'");
            }
            $exists = $exists->fetch();
            $startTimeID = $exists["timeID"];
        }
        
        /****************************************************************************************/
        
        if($endTimeID == "" || $endTimeID == null || !isset($endTimeID)){
            //GET END TIME DATA
            $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE '$endTime'");
            if(($exists->rowCount()) <= 0) {
                $dbh->query("INSERT INTO Time(timeStartEnd) VALUES ('$endTime')");
                $exists = $dbh->query("SELECT * FROM Time WHERE timeStartEnd LIKE '$endTime'");
            }
            $exists = $exists->fetch();
            $endTimeID = $exists["timeID"];
        }
        /****************************************************************************************/
        $update = false;
        if($sectionID == "" || $sectionID == null || !isset($sectionID)){
            //ADD SECTION
            $dbh->query("INSERT INTO Section(courseID, CRN, sectionName, startTimeID, endTimeID, roomID, year, semesterID, typeID, credits, isLab, sectionTitle) VALUES ('$courseID', '$crn', '$sectionName', '$startTimeID', '$endTimeID', '$roomID', '$year', '$semesterID', '$typeID', '$credits', '$isLab', '$sectionTitle')");
            $sectionID = $dbh->lastInsertID();
        }
        else{
            $update = true;
            $dbh->query("UPDATE Section SET courseID = '$courseID', CRN = '$crn', sectionName = '$sectionName', startTimeID = '$startTimeID', endTimeID = '$endTimeID', roomID = '$roomID', year = '$year', semesterID = '$semesterID', typeID = '$typeID', credits = '$credits', isLab = '$isLab', sectionTitle = '$sectionTitle' WHERE sectionID = '$sectionID'");
        }
        /****************************************************************************************/
        
        if($update){
            $dbh->query("DELETE FROM SectionDayMapping WHERE sectionID = ".$sectionID);
        }
        
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
        if($update) {
            $dbh->query("DELETE FROM SectionInstructorMapping WHERE sectionID = ".$sectionID);
        }
        if(is_int($profName)) {
            $dbh->query("INSERT INTO SectionInstructorMapping(sectionID, instructorID) VALUES ('$sectionID', '$profName')");
        }
        else{
            //ADD INSTRUCTORS TO SECTION
            foreach($profName as $name)
            {
                if(is_int($name)) {
                    $dbh->query("INSERT INTO SectionInstructorMapping(sectionID, instructorID) VALUES ('$sectionID', '$name')");
                }
                else{
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
        }
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $sectionID,
                'roomID' => $roomID,
                'message' => "Section was successfully updated.",
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
