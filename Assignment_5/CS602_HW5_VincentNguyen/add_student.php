<?php
    
    require_once('database.php');
    
    // Get the student form data
    $courseID =  filter_input(INPUT_POST, 'courseID');
    $firstName = filter_input(INPUT_POST, 'first_name');
    $lastName = filter_input(INPUT_POST, 'last_name');
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    
    
    if ($courseID == null || $firstName == null || $lastName == null || $email == false) {
        $error = 'Oops. Please check again.';
        include('error.php');
    } else {
        // Add the student to the database
    $query = 'INSERT INTO sk_students
                            (courseID, firstName, lastName, email)
                            VALUES (:courseID, :firstName, :lastName, :email)' ;
    $statementAdd = $db->prepare($query);
    $statementAdd->execute([
        ':courseID' => $courseID,
        ':firstName' => $firstName,
        ':lastName' => $lastName,
        ':email' => $email
    ]);
    $statementAdd->closeCursor();
    // Display the Student List page
    include('index.php');

}

?>