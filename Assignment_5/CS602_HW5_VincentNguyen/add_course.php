<?php
    require_once('database.php');

// Get the course form data
$courseID = filter_input(INPUT_POST,'course_id');
$courseName = filter_input(INPUT_POST,'course_name');

if ($courseID == null || $courseName == null) {
    $error = 'Oops. Please check again.';
    include('error.php');
} else {
    // Add the course to the database  
    $query = 'INSERT INTO sk_courses (courseID, courseName)
                        VALUES (:courseID, :courseName)';
    $statementAdd = $db->prepare($query);
    $statementAdd->execute([
        ':courseID' => $courseID,
        ':courseName' => $courseName,
    ]);
    $statementAdd->closeCursor();
    // Display the Course List page
    include('course_list.php');
}
?>