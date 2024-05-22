<?php
$a = -10;
$b = -5;

//Задание 1
if ($a >= 0 && $b >= 0) {
    $result = $a - $b;
} else if ($a < 0 && $b < 0) {
    $result = $a * $b;
} else {
    $result = $a + $b;
}
echo ("<p><b>Задание 1</b></p>" . "<p>Результат = " . $result . "</p>");

//Задание 2
$a = 7;
$result2 = "";

switch($a) {
    case 0:
            $result2 .= "0 ";
        case 1:
            $result2 .= "1 ";
        case 2:
            $result2 .= "2 ";
        case 3:
            $result2 .= "3";
        case 4:
            $result2 .= "4 ";
        case 5:
            $result2 .= "5 ";
        case 6:
            $result2 .= "6 ";
        case 7:
            $result2 .= "7 ";
        case 8:
            $result2 .= "8 ";
        case 9:
            $result2 .= "9 ";
        case 10:
            $result2 .= "10 ";
        case 11:
            $result2 .= "11 ";
        case 12:
            $result2 .= "12 ";
        case 13:
            $result2 .= "13 ";
        case 14:
            $result2 .= "14 ";
        case 15:
            $result2 .= "15";
            break;
        default:
            $result2 = "Значение не входит в промежуток";
            break;
}

echo ("<p><b>Задание 2</b></p>" . "<p>Результат = " . $result2 . "</p>");

//Задание 3
function summ($a, $b) {
    return $a + $b;
}

function multiplication($a, $b) {
    return $a * $b;
}

function difference($a, $b) {
    return $a - $b;
}

function division($a, $b) {
    return $a / $b;
}

echo ("<p><b>Задание 3</b></p>" .
"<p>3 + 5 = " . summ(3, 5) . "</p>" .
"<p>8 - 4 = " . difference(8, 4) . "</p>" .
"<p>7 * 4 = " . multiplication(7, 4) . "</p>" .
"<p>9 / 3 = " . division(9, 3) . "</p>");

//Задание 4
function mathOperation($arg1, $arg2, $operation) {
    switch ($operation) {
        case 'сумма':
            return summ($arg1, $arg2);
            break;
        case 'деление':
            return division($arg1, $arg2);
            break;
        case 'умножение':
            return multiplication($arg1, $arg2);
            break;
        case 'разность':
            return difference($arg1, $arg2);
            break;
        default:
            return 0;
            break;
    }
}
echo ("<p><b>Задание 4</b></p>" .
"<p>Сумма чисел 15 и 7 = " . mathOperation(15, 7, "сумма") . "</p>");

//Задание 6
function power($val, $pow) {
    if ($pow == 1) {
        return $val;
    } else {
        return $val * power($val, $pow - 1);
    }
}
echo ("<p><b>Задание 6</b></p>" .
"<p>Число 2 в 4 степени = " . power(2, 4) . "</p>");
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Задание 17</title>
</head>
<body>

</body>
</html>