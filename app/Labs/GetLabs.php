<?php
    /*
     *  GetRooms.php
     *
     *  This function gets the list of rooms for a semester
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
    	
    	$query = $dbh->prepare("SELECT DISTINCT r.roomID, r.roomNumber, r.capacity, b.buildingName FROM Section s 
                                JOIN Room r on r.roomID = s.roomID
                                JOIN Building b on b.buildingID = r.buildingID
                                JOIN Semester sm on sm.semesterID = s.semesterID
                                WHERE sm.semesterType LIKE '".$semester."%' AND s.year = ".$year." AND r.isLab = 1
                                ORDER BY r.roomNumber"
                                );
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        $rooms = array();
        
        //loop through instructors to construct object
        foreach($results as $r){
            //find all courses
            $query = $dbh->prepare("SELECT s.sectionName, s.sectionID, c.courseID, ts.timeStartEnd AS startTime, te.timeStartEnd AS endTime, s.year, co.hex FROM Section s 
                                    JOIN Room r on r.roomID = s.roomID
                                    JOIN Course c on c.courseID = s.courseID
                                    JOIN Building b on b.buildingID = r.buildingID
                                    JOIN Semester sm on sm.semesterID = s.semesterID
                                    JOIN Time ts on ts.timeID = s.startTimeID
                                    JOIN Time te on te.timeID = s.endTimeID
                                    JOIN ColorCoding co on SUBSTR(s.courseID,1,1) LIKE SUBSTR(co.key, 1,1)
                                    WHERE r.roomID = ".$r["roomID"]." AND sm.semesterType LIKE '".$semester."%' AND s.year = ".$year);
            $query->execute();
            $cResults = $query->fetchAll(PDO::FETCH_ASSOC);
            $courses = array();
            foreach($cResults as $c){
                //construct Day of week
                $query = $dbh->prepare("SELECT d.dayLetter FROM Day d
                                        JOIN Section s
                                        JOIN SectionDayMapping x on x.sectionID = s.sectionID && d.dayID = x.dayID
                                        WHERE s.sectionID = ".$c["sectionID"]);
                $query->execute();
                $dResults = $query->fetchAll(PDO::FETCH_ASSOC);
                $days = array();
                foreach($dResults as $d){
                    if($d['dayLetter'] == "M"){
                        array_push($days, 1);
                    }
                    else if($d['dayLetter'] == "T"){
                        array_push($days, 2);
                    }
                    else if($d['dayLetter'] == "W"){
                        array_push($days, 3);
                    }
                    else if($d['dayLetter'] == "H"){
                        array_push($days, 4);
                    }
                    else if($d['dayLetter'] == "F"){
                        array_push($days, 5);
                    }
                    else if($d['dayLetter'] == "M"){
                        array_push($days, 6);
                    }
                }
                
                //format start time
                $startTime = (substr($c["startTime"], 6,2) == 'am' || (int)substr($c["startTime"],0,2) == 12) ? (int)substr($c["startTime"],0,2) : (int)substr($c["startTime"],0,2) + 12;
                $startTime = $startTime.":".substr($c["startTime"],3,2);
                //format end time
                $endTime = (substr($c["endTime"], 6,2) == 'am' || (int)substr($c["endTime"],0,2) == 12) ? (int)substr($c["endTime"],0,2) : (int)substr($c["endTime"],0,2) + 12;
                $endTime = $endTime.":".substr($c["endTime"],3,2);
                
                $course = array(
                    'title' => 'EE'.$c["courseID"].' '.$c["sectionName"],
                    'sectionID' => $c["sectionID"],
                    'start' => $startTime,
                    'end' => $endTime,
                    'dow' => $days,
                    'backgroundColor' => "#".$c["hex"],
                    'eventTextColor' => '#000000',
                    'textColor' => '#000000'
                   
                );
                array_push($courses, $course);
            }
            //populate room object, add to array
            $room = array(
                'defaultView' => 'agendaWeek',
                'height' => 750,
                'editable' => true,
                'header' => array(
                    'left' => 'agendaWeek',
                    'center' => 'title',
                    'right' => 'prev,next'
                ),
                'titleFormat' => "[".$r["buildingName"]." ".$r["roomNumber"]." Capacity: ".$r["capacity"]."]",
                'allDaySlot' => false,
                'minTime' => "08:00:00",
                'maxTime' => "22:00:00",
                'events' => $courses
            );
            array_push($rooms, $room);
        }
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $rooms,
                'message' => "Rooms were successfully retrieved.",
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
