<?php
define('TAX_RATES',
  array(
    'Single' => array(
      'Rates' => array(10,12,22,24,32,35,37),
      'Ranges' => array(0,9700,39475,84200,160725,204100,510300),
      'MinTax' => array(0, 970,4543,14382,32748,46628,153798)
      ),
    'Married_Jointly' => array(
      'Rates' => array(10,12,22,24,32,35,37),
      'Ranges' => array(0,19400,78950,168400,321450,408200,612350),
      'MinTax' => array(0, 1940,9086,28765,65497,93257,164709)
      ),
    'Married_Separately' => array(
      'Rates' => array(10,12,22,24,32,35,37),
      'Ranges' => array(0,9700,39475,84200,160725,204100,306175),
      'MinTax' => array(0, 970,4543,14382.50,32748.50,46628.50,82354.75)
      ),
    'Head_Household' => array(
      'Rates' => array(10,12,22,24,32,35,37),
      'Ranges' => array(0,13850,52850,84200,160700,204100,510300),
      'MinTax' => array(0, 1385,6065,12962,31322,45210,152380)
      )
    )
);

// Code for calculating income tax

function incomeTax($taxableIncome, $status) {
  $incTax = 0.0;
  $arrRate = TAX_RATES[$status]['Rates'];
  $arrRanges = TAX_RATES[$status]['Ranges'];
  $arrMinTax = TAX_RATES[$status]['MinTax'];
  $arrLeng = count($arrRanges) - 1;
  $index = 0;
  for ($i = $arrLeng; $i >= 0 ; $i--){
    if ($taxableIncome >= $arrRanges[$i]) {
      $index = $i;
      break;
    }
  }
  $incTax = $arrMinTax[$index] + ($taxableIncome - $arrRanges[$index])*($arrRate[$index]/100);
  return $incTax;
}



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW4 Part2 - LastName</title>

  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</head>

<body>

<div class="container">

    <h3>Income Tax Calculator</h3>

    <form class="form-horizontal" method="post">

      <div class="form-group">
        <label class="control-label col-sm-2">Enter Net Income:</label>
        <div class="col-sm-10">
          <input type="number"  step="any" name="netIncome" placeholder="Taxable  Income" required autofocus>
        </div>
      </div>
      <div class="form-group"> 
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>

    </form>

    <?php

// Code for form submission results

if(isset($_POST['netIncome'])) {
  $income = $_POST['netIncome'];
  echo "With a net taxable income of $ ". number_format($income,2,".",",")."
  <table class='table table-striped'>
      <thead>
          <tr>
              <th scope='col'><h3>Status</h3></th>
              <th scope='col'><h3>Tax</h3></th>
          </tr>
      </thead> <tbody>";
  foreach(TAX_RATES as $stat => $val) {
    $incomeTax = incomeTax($income, $stat);
    if (str_contains($stat,'_')){
      if (str_contains($stat,'Married')) {
        $stat = str_replace('_',' Filing ',$stat);
      } else {
        $stat = str_replace('_',' Of ',$stat);
      }
    }
    echo    "<tr>
                <td>$stat</td>
                <td>$". number_format($incomeTax,2,".",",")."</td>
            </tr>";
  }
  echo '<tbody> </table>';
}

?>


    <h3>2019 Tax Tables</h3>

<?php
// Code for Tax Tables display
  foreach(TAX_RATES as $status => $value) {
    echo "<h4> $status</h4>";
    echo '<table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Taxable Income</th>
                <th scope="col">Tax Rate</th>
              </tr>
            </thead>
            <tbody>'
            ;
    $rate = $value['Rates'];
    $ranges = $value['Ranges'];
    $minTax = $value['MinTax'];
    $arrLength = count($rate)- 1;
    for($count = 0; $count <= $arrLength; $count++) {
        if ($count == 0) {
          echo '<tr>
                  <td>$'.$ranges[$count]. '- $'. number_format($ranges[$count +1],0,".",","). '</td>
                  <td>'.$rate[$count].'%</td>
                </tr>';
        } elseif ($count == $arrLength){
          echo '<tr>
                  <td>$'.number_format((int)$ranges[$count] +1,0,".",","). ' or more </td>
                  <td>$'.number_format($minTax[$count],2,".",",").' plus '. $rate[$count].'% of the amount over $'.number_format($ranges[$count],0,".",",").'</td>
                </tr>';
        }
        else {
          echo "<tr>
                  <td>$". number_format((int)$ranges[$count] +1,0,".",",") . "- $" .number_format($ranges[$count +1],0,".",",") . "</td>
                  <td>$".number_format($minTax[$count],2,".",","). " plus $rate[$count]% of the amount over $". number_format($ranges[$count],0,".",",")."</td>
                </tr>";
        }
      }
    echo '  </tbody>
        </table>';
  }

?>   
</div>

</body>
</html>