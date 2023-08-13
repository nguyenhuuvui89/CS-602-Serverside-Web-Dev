<?php
require_once('database.php');
// Get values from the post request
$studentID = filter_input(INPUT_POST, 'studentID', FILTER_VALIDATE_INT);
$courseID = filter_input(INPUT_POST,'courseID', FILTER_SANITIZE_SPECIAL_CHARS); // (this value will help the page keep in the same course if delete students URL?courseID = courseID)

// Delete the student from the database
if ($studentID !==false && $courseID !==false) {
  $deleteQuery = 'DELETE FROM sk_students WHERE studentID = :studentID';
  $deleteStatement = $db->prepare($deleteQuery);
  $deleteStatement->bindValue(':studentID', $studentID);
  $deleteStatement->execute();
  $deleteStatement->closeCursor();
}

// Display the Home page ($courseID will go through index.php condition if (!isset($courseID)) won't execute)
include('index.php');