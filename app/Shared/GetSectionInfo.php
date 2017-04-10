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
        
        $sectionID = testInput($_REQUEST['sectionID']);
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
        $section = $dbh->prepare("SELECT * FROM Section WHERE sectionID = ".$sectionID);
        $section->execute();
        $section = $section->fetch();
        
        $instructors = $dbh->prepare("SELECT * FROM SectionInstructorMapping WHERE sectionID = ".$sectionID);
        $instructors->execute();
        $instructors = $instructors->fetchAll();
        $instructorList = array();
        foreach($instructors as $i) {
            array_push($instructorList, $i["instructorID"]);
        }
        
        $days = $dbh->prepare("SELECT * FROM SectionDayMapping x
                              JOIN Day d on d.dayID = x.dayID
                              WHERE sectionID = ".$sectionID);
        $days->execute();
        $days = $days->fetchAll();
        $dayLetters = "";
        foreach($days as $d) {
            $dayLetters = $dayLetters.$d["dayLetter"];
        }
        
        $sectionData = array(
            'sectionID'         => $sectionID,
            'courseID'          => $section["courseID"],
            'sectionName'       => $section["sectionName"],
            'startTimeID'       => $section["startTimeID"],
            'endTimeID'         => $section["endTimeID"],
            'roomID'            => $section["roomID"],
            'year'              => $section["year"],
            'semesterID'        => $section["semesterID"],
            'typeID'            => $section["typeID"],
            'credits'           => $section["credits"],
            'crn'               => $section["CRN"],
            'isLab'             => $section["isLab"],
            'sectionTitle'      => $section["sectionTitle"],
            'instructors'       => $instructorList,
            'days'              => $dayLetters
        );
        
        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $sectionData,
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
