<?php
    /*
        Validates user input on the back end
        $type: the type of input expected
        $value: the value to be checked
    */
    function validate ($type, $value)
    {
        
        if($type == "link") {
            return filter_var($value, FILTER_VALIDATE_URL);
        }
        if($type == "picture") {
            $ext = substr($value, strlen($value) - 4, 4);
            if($ext != ".png" && $ext != ".jpg" && $ext != ".gif") return false;
            else return true;
        }
        if($type == "int") {
            return is_numeric($value);
        }
        if($type == "string") {
            return true;
        }
        if($type == "date") {
            if($value instanceof DateTime) return true;
            else return false;
        }
    }

    /*
        make input less harmful
    */
    function testInput($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    
    function urlExists($url) {
    if (!$fp = curl_init($url)) return false;
    return true;
}

?>

