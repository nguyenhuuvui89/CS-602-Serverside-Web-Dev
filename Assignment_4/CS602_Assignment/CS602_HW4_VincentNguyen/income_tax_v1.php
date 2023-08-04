<?php

// Fill in the code for the following four functions


function incomeTaxSingle($taxableIncome) {
    $incTax = 0.0;
    if ($taxableIncome > 510300) {
        $incTax = 153798 + ($taxableIncome - 510300)*0.37;
    } elseif ($taxableIncome > 204100 && $taxableIncome < 510300) {
        $incTax = 46628 + ($taxableIncome - 204100)*0.35;
    } elseif ($taxableIncome > 160725 && $taxableIncome < 204100) {
        $incTax = 32748 + ($taxableIncome - 160725)*0.32;
    } elseif ($taxableIncome > 84200 && $taxableIncome < 160725) {
        $incTax = 14382 + ($taxableIncome - 84200)*0.24;
    } elseif ($taxableIncome > 39475 && $taxableIncome < 84200) {
        $incTax = 4543 + ($taxableIncome - 39475)*0.22;
    } elseif ($taxableIncome > 9700 && $taxableIncome < 39475) {
        $incTax = 970 + ($taxableIncome - 9700)*0.12;
    } elseif ($taxableIncome > 0 && $taxableIncome < 9700) {
        $incTax = $taxableIncome*0.1;
    } 
    return $incTax;
}

function incomeTaxMarriedJointly($taxableIncome) {
    $incTax = 0.0;
    if ($taxableIncome > 612350) {
        $incTax = 164709 + ($taxableIncome - 612350)*0.37;
    } elseif ($taxableIncome > 408200 && $taxableIncome < 612350) {
        $incTax = 93257 + ($taxableIncome - 408200)*0.35;
    } elseif ($taxableIncome > 321450 && $taxableIncome < 408200) {
        $incTax = 65497 + ($taxableIncome - 321450)*0.32;
    } elseif ($taxableIncome > 168400 && $taxableIncome < 321450) {
        $incTax = 28765 + ($taxableIncome - 168400)*0.24;
    } elseif ($taxableIncome > 78950 && $taxableIncome < 168400) {
        $incTax = 9086 + ($taxableIncome - 78950)*0.22;
    } elseif ($taxableIncome > 19400 && $taxableIncome < 78950) {
        $incTax = 1940 + ($taxableIncome - 19400)*0.12;
    } elseif ($taxableIncome > 0 && $taxableIncome < 19400) {
        $incTax = $taxableIncome*0.1;
    } 
    return $incTax;
}

function incomeTaxMarriedSeparately($taxableIncome) {
    $incTax = 0.0;
    if ($taxableIncome > 306175) {
        $incTax = 82354.75 + ($taxableIncome - 306175)*0.37;
    } elseif ($taxableIncome > 204100 && $taxableIncome < 306175) {
        $incTax = 46628.5 + ($taxableIncome - 204100)*0.35;
    } elseif ($taxableIncome > 160725 && $taxableIncome < 204100) {
        $incTax = 32748.5 + ($taxableIncome - 160725)*0.32;
    } elseif ($taxableIncome > 84200 && $taxableIncome < 160725) {
        $incTax = 14382.5 + ($taxableIncome - 84200)*0.24;
    } elseif ($taxableIncome > 39475 && $taxableIncome < 84200) {
        $incTax = 4543 + ($taxableIncome - 39475)*0.22;
    } elseif ($taxableIncome > 9700 && $taxableIncome < 39475) {
        $incTax = 970 + ($taxableIncome - 9700)*0.12;
    } elseif ($taxableIncome > 0 && $taxableIncome < 9700) {
        $incTax = $taxableIncome*0.1;
    }     
    return $incTax;

}

function incomeTaxHeadOfHousehold($taxableIncome) {
    $incTax = 0.0;
    if ($taxableIncome > 510300) {
        $incTax = 152380 + ($taxableIncome - 510300)*0.37;
    } elseif ($taxableIncome > 204100 && $taxableIncome < 510300) {
        $incTax = 45210 + ($taxableIncome - 204100)*0.35;
    } elseif ($taxableIncome > 160700 && $taxableIncome < 204100) {
        $incTax = 31322 + ($taxableIncome - 160700)*0.32;
    } elseif ($taxableIncome > 84200 && $taxableIncome < 160700) {
        $incTax = 12962 + ($taxableIncome - 84200)*0.24;
    } elseif ($taxableIncome > 52850 && $taxableIncome < 84200) {
        $incTax = 6065 + ($taxableIncome - 52850)*0.22;
    } elseif ($taxableIncome > 13850 && $taxableIncome < 52850) {
        $incTax = 1385 + ($taxableIncome - 13850)*0.12;
    } elseif ($taxableIncome > 0 && $taxableIncome < 13850) {
        $incTax = $taxableIncome*0.1;
    }   
    return $incTax;

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW4 Part1 - LastName</title>

  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">

    <h3>Income Tax Calculator</h3>

    <form class="form-horizontal" method="post">

        
        <div class="form-group">
            <label class="control-label col-sm-2" for="netIncome">Your Net Income:</label>
            <div class="col-sm-10">
            <input type="number" step="any" name="netIncome" placeholder="Taxable  Income" required autofocus>
            </div>
        </div>
        <div class="form-group"> 
            <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </form>


    <?php

        // Fill in the rest of the PHP code for form submission results

        if(isset($_POST['netIncome'])) {
            $incomeTaxS = incomeTaxSingle($_POST['netIncome']);
            $incomeTaxMj = incomeTaxMarriedJointly($_POST['netIncome']);
            $incomeTaxMs = incomeTaxMarriedSeparately($_POST['netIncome']);
            $incomeTaxH = incomeTaxHeadOfHousehold($_POST['netIncome']);
        // Format the number
            $taxableIn = number_format($_POST['netIncome'],2,".",",");
        // Array for taxes with key and value pairs
            $tax = array("Single" => $incomeTaxS, "Married Filling Jointly" => $incomeTaxMj,
                        "Married Filling Separately" => $incomeTaxMs, "Head of Household" => $incomeTaxH);
            echo "With a net taxable income of $ $taxableIn
                <table class='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'><h3>Status</h3></th>
                            <th scope='col'><h3>Tax</h3></th>
                        </tr>
                    </thead> <tbody>";
        // Loop through the array
            foreach ($tax as $att => $value) {
                $value = number_format($value,2,".",",");
                echo    "<tr>
                            <td>$att</td>
                            <td>$$value</td>
                        </tr>";
            }
            echo '<tbody> </table>';
        }
    ?>

</div>

</body>
</html>