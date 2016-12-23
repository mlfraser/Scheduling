<?php
    /*
     *  GetInstructors.php
     *
     *  This function gets the list of semesters
     *
     *  Returns:        An object indicating success or error
     *                  Success containing list of semester data
     *                  Error containing error object with message
     */
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        include '/itss/local/home/ecescheduling/public_html/resources/functions/validate.php';
        
        //Parameters, with data propery sifted through
        $semester = $_REQUEST['semester'];
        $year = $_REQUEST['year'];
        
        //validate data coming in
        if($year == null || $year == "") {
            throw new Exception('The year passed in is not defined', 1);
        }
        if($semester == null || $semester == "") {
            throw new Exception('The semester passed in is not defined', 1);
        }
        
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
    	
    	$query = $dbh->prepare("SELECT DISTINCT i.instructorID, i.name FROM Section s
                                JOIN Instructor i
                                JOIN SectionInstructorMapping si on i.instructorID = si.instructorID AND s.sectionID = si.sectionID
                                JOIN Semester sm on s.semesterID = sm.semesterID
                                WHERE sm.semesterType LIKE '".$semester."%' && s.year = ".$year);
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        $instructors = array();
        
        //loop through instructors to construct object
        foreach($results as $r){
            //find all courses
            $query = $dbh->prepare("SELECT s.sectionName, ts.timeStartEnd AS startTime, te.timeStartEnd AS endTime, c.title, s.credits, s.isLab, c.courseID, s.sectionID FROM Section s
                                    JOIN Instructor i
                                    JOIN Course c on c.courseID = s.courseID
                                    JOIN SectionInstructorMapping si on i.instructorID = si.instructorID AND s.sectionID = si.sectionID
                                    JOIN Semester sm on s.semesterID = sm.semesterID
                                    JOIN Time ts on ts.timeID = s.startTimeID
                                    JOIN Time te on te.timeID = s.endTimeID
                                    JOIN Type t on t.typeID = s.typeID
                                    WHERE sm.semesterType LIKE '".$semester."%' && s.year = '".$year."' && i.instructorID = '".$r["instructorID"]."'");
            $query->execute();
            $cResults = $query->fetchAll(PDO::FETCH_ASSOC);
            $courses = array();
            foreach($cResults as $c){
                $query = $dbh->prepare("SELECT d.dayLetter FROM Day d
                                        JOIN Section s
                                        JOIN SectionDayMapping x on x.sectionID = s.sectionID && d.dayID = x.dayID
                                        WHERE s.sectionID = ".$c["sectionID"]);
                $query->execute();
                $dResults = $query->fetchAll(PDO::FETCH_ASSOC);
                $days = "";
                foreach($dResults as $d){
                    $days  = $days.$d['dayLetter'];
                }
                $course = array(
                    'SectionName' => $c["sectionName"],
                    'StartTime' => $c["startTime"],
                    'EndTime' => $c["endTime"],
                    'CourseTitle' => $c["title"],
                    'Credits' => $c["credits"],
                    'IsLab' => $c["isLab"],
                    'CourseID' => $c["courseID"],
                    'SectionID' => $c["sectionID"],
                    'Days' => $days
                );
                array_push($courses, $course);
            }
            
            $instructor = array(
                'InstructorName' => $r["name"],
                'InstructorID' => $r["instructorID"],
                'Courses' => $courses
            );
            array_push($instructors, $instructor);
        }
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $instructors,
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
