<?php
    /*
     *  DeleteSection.php
     *
     *  This function deletes a section from the database
     *
     *  Returns:        An object indicating success or error
     */
    try
    {
        include '/itss/local/home/ecescheduling/config.php';
        include '/itss/local/home/ecescheduling/public_html/resources/functions/validate.php';
        
        //Parameters, with data propery sifted through
        
        $sectionID = testInput($_REQUEST['sectionID']);
        
        if(!isset($sectionID) || $sectionID == null || $sectionID == 0) {
            throw new Exception("The section ID passed in was not defined",0);
        }
        
        
        
    	$options = array(
    	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    	);
        
    	$dbh = new PDO(DSN, DBUSER, DBPASS, $options) or die('Cannot connect to database');
        
        
        $query = $dbh->prepare("DELETE FROM SectionInstructorMapping WHERE sectionID = $sectionID");
        $query->execute();
        $query = $dbh->prepare("DELETE FROM SectionDayMapping WHERE sectionID = $sectionID");
        $query->execute();
        $query = $dbh->prepare("DELETE FROM Section WHERE sectionID = $sectionID");
        $query->execute();
        $exists = $dbh->prepare("SELECT * FROM Section WHERE sectionID = $sectionID");
        $exists->execute();
    	if(($exists->rowCount()) > 0) {
    	    throw new Exception("There was an error in removing the section.", 1);
    	}

        
        //convert to json string
        echo json_encode(array(
            'success' => array(
                'result' => $sectionID,
                'message' => "The section was successfully deleted.",
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
