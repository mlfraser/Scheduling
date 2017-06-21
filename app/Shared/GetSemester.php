<?php
    /*
     *  GetSemester.php
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
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
    	
    	$query = $dbh->prepare("SELECT * FROM ((SELECT DISTINCT s.year AS year, 'Fall' AS semester from Section s
                                JOIN Semester sm on sm.semesterID = s.semesterID
                                WHERE sm.semesterType LIKE 'Fall%')
                                UNION
                                (SELECT DISTINCT s.year as year, 'Summer' AS semester from Section s
                                JOIN Semester sm on sm.semesterID = s.semesterID
                                WHERE sm.semesterType LIKE 'Summer%')
                                UNION
                                (SELECT DISTINCT s.year AS year, 'Spring' AS semester from Section s
                                JOIN Semester sm on sm.semesterID = s.semesterID
                                WHERE sm.semesterType LIKE 'Spring%')) AS x ORDER BY x.year DESC, x.semester ASC");
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        for($i = 0; $i < sizeof($results); $i++) {
            $results[$i]["i"] = $i;
        }
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $results,
                'message' => "Semesters were successfully retrieved.",
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
