<?php
require_once('database.php');

// Retrieve all courses
$queryCourseID = 'SELECT * FROM sk_courses';
$statementCourse = $db ->prepare($queryCourseID);
$statementCourse ->execute();
$courseIDs = $statementCourse->fetchAll();
$statementCourse ->closeCursor();

// Handle GET request (query will be courseID)
if (!isset($courseID)) {
    $courseID = filter_input(INPUT_GET, 'courseID', FILTER_SANITIZE_SPECIAL_CHARS);
    $validCourseIDs = array_column($courseIDs, 'courseID');
    if (!in_array($courseID, $validCourseIDs)) {
        $courseID = 'cs601';
    }
};
// $courseID = filter_input(INPUT_GET, 'courseID', FILTER_VALIDATE_INT) ?$courseID : 1;

// Retrieve selected course name
$courseQuery = 'SELECT * from sk_courses WHERE courseID = :courseID ORDER BY courseID ASC';
$statementCourseName = $db->prepare($courseQuery);
$statementCourseName ->bindValue(':courseID', $courseID);
$statementCourseName ->execute();
$courseNames = $statementCourseName->fetch();
$statementCourseName->closeCursor();


// Retrieve students for selected course
$query = 'SELECT * FROM sk_students
                    WHERE courseID = :courseID';
$statementStudent = $db->prepare($query);
$statementStudent ->bindValue(':courseID', $courseID);
$statementStudent ->execute();
$students = $statementStudent->fetchAll();
$statementStudent->closeCursor();

?>

<!DOCTYPE html>
<html>

<!-- the head section -->
<head>
    <title>My Course Manager</title>
    <link rel="stylesheet" type="text/css" href="main.css" />
</head>

<!-- the body section -->
<body>
<header><h1>Course Manager</h1></header>
<main>
    <center><h1>Student List</h1></center>

    <aside>
        <!-- display a list of categories -->
        <h2>Courses</h2>
        <nav>
        <ul>
            <?php foreach($courseIDs as $courseID) { ?>
                <li><a href="./index.php?courseID=<?php echo $courseID['courseID']; ?>">
                    <?php echo $courseID['courseID']; ?>
                </a>
                </li>
           <?php } ?>
        </ul>
        </nav>          
    </aside>

    <section>
        <!-- display a table of Students -->
        <h2><?php echo "{$courseNames['courseID']} - {$courseNames['courseName']}"; ?></h2>
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>&nbsp;</th>
            </tr>

            <?php foreach ($students as $student) { ?>
            <tr>
                <td> <?php echo $student['firstName']; ?> </td>
                <td> <?php echo $student['lastName']; ?> </td>
                <td> <?php echo $student['email']; ?> </td>
                <td>
                    <form action="delete_student.php" method="POST">
                        <input type="hidden" name="studentID"
                            value="<?php echo $student['studentID']; ?>">
                        <input type="hidden" name="courseID"
                            value="<?php echo $student['courseID']; ?>">
                        <input type="submit" value="Delete">
                    </form>
                </td>
            </tr>
        <?php }; ?>
            
        </table>

        <p><a href="add_student_form.php">Add Student</a></p>

        <p><a href="course_list.php">List Courses</a></p>    

    </section>
</main>

<footer>
    <p>&copy; <?php echo date("Y"); ?> Suresh Kalathur</p>
</footer>
</body>
</html>