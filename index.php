<?php

$title = 'Мое название';
$h1 = 'Мой заголовок';
date_default_timezone_set('Asia/Yekaterinburg');
$currentDate = date('Y');

function getCurrentTime() {
    $currentH = (int)date('H');
    $currentM = (int)date('i');

    if ($currentH == 0 || ($currentH >= 5 && $currentH <= 20)) {
        $hoursDecl = 'часов';
    } else if ($currentH == 1 || $currentH == 21 ) {
        $hoursDecl = 'час';
    } else if (($currentH >= 2 && $currentH <= 4) || ($currentH >= 22 && $currentH <= 24)) {
        $hoursDecl = 'часа';
    }

    if ($currentM != 11 && (string)$currentM[-1] == "1") {
        $minDecl = 'минута';
    } else if ($currentM < 12 && $currentM > 14 && ((string)$currentM[-1] == "2" ||
        (string)$currentM[-1] == "3" || (string)$currentM[-1] == "4")) {
        $minDecl = 'минуты';
    } else {
        $minDecl = 'минут';
    }

    return $currentH . " " . $hoursDecl . " " . $currentM . " " . $minDecl;
}

?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?php echo $title ?></title>
</head>
<body>
<div>
    <h1><?php echo $h1 ?></h1>
    <p>Текущий год: <?php echo $currentDate ?></p>
</div>

<div>
    <p>Текущее время: <?php echo getCurrentTime() ?></p>
</div>
</body>
</html>