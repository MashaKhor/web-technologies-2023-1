<?php
    date_default_timezone_set("Asia/Yekaterinburg");
    $title = "Способ 1";
    $year = date("Y");
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Способ 1</title>
</head>
<body>
    <h1><?= $title ?></h1>
    <p>Текущий год: <?= $year ?></p>
</body>
</html>