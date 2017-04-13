<?php
    /*
     *  GetSectionHistory.php
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
        
       
        $query = $dbh->prepare("SELECT c.title, c.courseID, t.classType, s.roomID, s.sectionID, s.sectionName, s.typeID, s.credits, s.CRN, s.isLab, sm.semesterType, s.year, st.timeStartEnd as startTime, et.timeStartEnd as endTime FROM Section s
                                JOIN Semester sm on sm.semesterID = s.semesterID
                                JOIN Time st on st.timeID = s.startTimeID
                                JOIN Time et on et.timeID = s.endTimeID
                                JOIN Course c on c.courseID = s.courseID
                                JOIN Type t on t.typeID = s.typeID");
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        $courses = array();
        foreach($results as $r) {
            $query = $dbh->prepare("SELECT i.name, i.instructorID FROM Instructor i
                                    JOIN Section s
                                    JOIN SectionInstructorMapping x on x.sectionID = s.sectionID AND i.instructorID = x.instructorID
                                    WHERE s.sectionID = ".$r["sectionID"]);
            $query->execute();
            $iResults = $query->fetchAll(PDO::FETCH_ASSOC);
            $instructors = array();
            foreach($iResults as $i) {
                $instructor = array(
                    'name'         => $i["name"],
                    'instructorID' => $i["instructorID"]
                );
                array_push($instructors, $instructor);
            }
            
            $query = $dbh->prepare("SELECT d.dayLetter FROM Day d
                                    JOIN Section s
                                    JOIN SectionDayMapping x on x.sectionID = s.sectionID AND d.dayID = x.dayID
                                    WHERE s.sectionID = ".$r["sectionID"]);
            $query->execute();
            $dResults = $query->fetchAll(PDO::FETCH_ASSOC);
            $days = "";
            foreach($dResults as $d) {
                $days .= $d["dayLetter"];
            }
            
            $query = $dbh->prepare("SELECT r.roomNumber, b.buildingName from Room r
                                    JOIN Building b on b.buildingID = r.buildingID
                                    WHERE r.roomID = ".$r["roomID"]);
            $query->execute();
            $rResults = $query->fetch();
            
            $course = array(
                'courseTitle' => $r["title"],
                'courseID' => $r["courseID"],
                'sectionID' => $r["sectionID"],
                'sectionName' => $r["sectionName"],
                'classType' => $r["classType"],
                'credits' => $r["credits"],
                'CRN' => $r["CRN"],
                'isLab' => $r["isLab"],
                'semester' => $r["semesterType"],
                'year' => $r["year"],
                'room' => $rResults["buildingName"]." ".$rResults["roomNumber"],
                'startTime' => $r["startTime"],
                'endTime' => $r["endTime"],
                'instructors' => $instructors,
                'days' => $days
            );
            array_push($courses, $course);
        }
        
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $courses,
                'message' => "Course history was successfully retrieved.",
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
