<?php
    /*
     *  UpdateSectionTime.php
     *
     *  This function updates the time of a section
     *
     *  Returns:        An object indicating success or error
     */
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        include '/itss/local/home/ecescheduling/public_html/resources/functions/validate.php';
        
        //Parameters, with data propery sifted through
        
        $sectionID = testInput($_REQUEST['sectionID']);
        $startTime = testInput($_REQUEST['startTime']);
        $endTime = testInput($_REQUEST['endTime']);
        
        if(!isset($sectionID) || $sectionID == null || $sectionID == 0) {
            throw new Exception("The section ID passed in was not defined",0);
        }
        
        if(!isset($startTime) || $startTime == null || $startTime == "") {
            throw new Exception("The start time passed in was not defined",0);
        }
        
        if(!isset($endTime) || $endTime == null || $endTime == "") {
            throw new Exception("The end time passed in was not defined",0);
        }
        
        
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
        
        //find start time id
        $query = $dbh->prepare("SELECT * FROM Time WHERE fullTime LIKE ".$dbh->quote($startTime));
        $query->execute();
        if($query->rowCount() <= 0) {
            $date = new DateTime($startTime);
            $ampm = $date->format('h:i a') ;
            $query = $dbh->prepare("INSERT INTO Time(fullTime, timeStartEnd) values(".$dbh->quote($startTime).", ".$dbh->quote($ampm).")");
            $query->execute();
            $query = $dbh->prepare("SELECT * FROM Time WHERE fullTime LIKE $startTime");
            $query->execute();
        }
        $startTimeID = $query->fetch();
        $startTimeID = $startTimeID["timeID"];
        
        //find end time id
        $query = $dbh->prepare("SELECT * FROM Time WHERE fullTime LIKE ".$dbh->quote($endTime));
        $query->execute();
        if($query->rowCount() <= 0) {
            $date = new DateTime($endTime);
            $ampm = $date->format('h:i a') ;
            $query = $dbh->prepare("INSERT INTO Time(fullTime, timeStartEnd) values(".$dbh->quote($endTime).", ".$dbh->quote($ampm).")");
            $query->execute();
            $query = $dbh->prepare("SELECT * FROM Time WHERE fullTime LIKE ".$dbh->quote($endTime));
            $query->execute();
        }
        $endTimeID = $query->fetch();
        $endTimeID = $endTimeID["timeID"];
        
        //update section with new data
        $query = $dbh->prepare("UPDATE Section SET endTimeID = $endTimeID, startTimeID = $startTimeID WHERE sectionID = $sectionID");
        $query->execute();
        
        //check to make sure it added
        $query = $dbh->prepare("SELECT * FROM Section WHERE sectionID = $sectionID AND endTimeID = $endTimeID AND startTimeID = $startTimeID");
        $query->execute();
        if($query->rowCount() <= 0) {
            throw new Exception("There was an error in updating the section times.",0);
        }

        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $sectionID,
                'message' => "The section's time was successfully updated.",
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
