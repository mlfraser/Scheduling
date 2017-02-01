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
        
        //Parameters, with data propery sifted through
        $semester = $_REQUEST['semester'];
        $year = $_REQUEST['year'];
        $isLab = $_REQUEST['isLab'];
        
        //validate data coming in
        if($year == null || $year == "") {
            throw new Exception('The year passed in is not defined', 1);
        }
        if($semester == null || $semester == "") {
            throw new Exception('The semester passed in is not defined', 1);
        }
        if($isLab == null || $isLab == "") {
            throw new Exception('The isLab parameter passed in is not defined', 1);
        }
        
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
        $dow = array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');
        $abbrev = array('M', 'T', 'W', 'R', 'F');
        
        $days = array();
        for($i = 0; $i < 5; $i++) {
            $query = $dbh->prepare("SELECT DISTINCT st.timeStartEnd as startTime, s.startTimeID FROM Section s
                                    JOIN Day d
                                    JOIN SectionDayMapping x on x.dayID = d.dayID AND s.sectionID = x.sectionID
                                    JOIN Time st on s.startTimeID = st.timeID
                                    JOIN Time et on et.timeID = s.endTimeID
                                    JOIN Semester sm on s.semesterID = sm.semesterID
                                    WHERE d.dayLetter LIKE '".$abbrev[$i]."' AND s.year = ".$year." AND sm.semesterType LIKE '".$semester."%' AND s.isLab = ".$isLab."
                                    ORDER BY st.fullTime, startTime");
            $query->execute();
            $results = $query->fetchAll(PDO::FETCH_ASSOC);
            $times = array();
            foreach ($results as $r) {
                $query = $dbh->prepare("SELECT s.courseID, s.sectionName, r.roomNumber, b.buildingName, s.sectionID, b.buildingID FROM Section s
                                        JOIN Day d
                                        JOIN SectionDayMapping x on x.dayID = d.dayID AND s.sectionID = x.sectionID
                                        JOIN Time st on s.startTimeID = st.timeID
                                        JOIN Time et on et.timeID = s.endTimeID
                                        JOIN Semester sm on s.semesterID = sm.semesterID
                                        JOIN Room r on r.roomID = s.roomID
                                        JOIN Building b on b.buildingID = r.buildingID
                                        WHERE d.dayLetter LIKE '".$abbrev[$i]."' AND s.year = ".$year." AND sm.semesterType LIKE '".$semester."%' AND s.startTimeID = ".$r["startTimeID"]."  AND s.isLab = ".$isLab);
                $query->execute();
                $cResults = $query->fetchAll(PDO::FETCH_ASSOC);
                $courses = array();
                foreach ($cResults as $c) {
                    $query = $dbh->prepare("SELECT i.name, i.instructorID FROM Section s
                                            JOIN Instructor i
                                            JOIN SectionInstructorMapping x on x.instructorID = i.instructorID AND s.sectionID = x.sectionID
                                            WHERE s.sectionID = ".$c["sectionID"]);
                    $query->execute();
                    $iResults = $query->fetchAll(PDO::FETCH_ASSOC);
                    $instructors = array();
                    foreach ($iResults as $in) {
                        $instructor = array(
                            'Name' => $in["name"],
                            'InstructorID' => $in["instructorID"]
                        );
                        array_push($instructors, $instructor);
                    }
                    $course = array(
                        'Instructors' => $instructors,
                        'CourseID' =>  $c["courseID"],
                        'SectionName' =>  $c["sectionName"],
                        'RoomNumber' =>  $c["roomNumber"],
                        'BuildingName' =>  $c["buildingName"],
                        'BuildingID' => $c["buildingID"],
                        'SectionID' =>  $c["sectionID"]
                    );
                    array_push($courses, $course);
                }
                $time = array(
                    'StartTime' => $r["startTime"],
                    'EndTime' => $r["endTime"],
                    'StartTimeID' => $r["startTimeID"],
                    'EndTimeID' => $r["endTimeID"],
                    'Courses' => $courses
                );
                array_push($times, $time);
            }
            $day = array(
                $dow[$i] => $times
            );
            array_push($days, $day);
            
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
