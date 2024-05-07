<?php

// Задание 1

$num = 0;
echo '<h1>Задание 1</h1>';

do
{
    if ($num == 0) {
        $result1 = '<p>' . $num . ' - это ноль.</p>';
    } else if ($num % 2 == 0) {
        $result1 = '<p>' . $num . ' - это четное число.</p>';
    } else {
        $result1 = '<p>' . $num . ' - это нечетное число.</p>';
    }
    $num += 1;
    echo $result1;
} while ($num <= 10);


// Задание 2

$cities = [
"Московская область" => [
    "Москва",
    "Зеленоград",
    "Клин"
],
"Ленинградская область" => [
    "Санкт-Петербург",
    "Всеволожск",
    "Павловск",
    "Кронштадт"
],
"Рязанская область" => [
    "Рязань",
    "Скопин",
    "Рыбное"
]
];

$result2 = "";
echo '<h1>Задание 2</h1>';

foreach($cities as $citykey => $cityvalue) {
    $result2 = "<p>" . $citykey . ":</p>";
    $result2 .= implode(", ", $cityvalue);
    echo $result2;
}

// Задание 3

$letters = ["а" => "a", "б" => "b", 'в' => 'v', "г" => "g", "д" => "d", "е" => "e", "ё" => "e", "ж" => "zh",
"з" => "z", "и" => "i", "й" => "y", 'к' => 'k', "л" => "l", "м" => "m", "н" => "n", "о" => "o", "п" => "p",
"р" => "r", "с" => "s", "т" => "t", "у" => "u", "ф" => "f", "х" => "kh", "ц" => "ts", "ч" => "ch",
"ш" => "sh", "щ" => "shch", "ъ" => "'", "ы" => "y", "ь" => "'", "э" => "e", "ю" => "yu", "я" => "ya"];

echo '<h1>Задание 3</h1>';

function transliteration($words, $arrLetters) {
    $resultStr = "";

    for($i = 0, $len = mb_strlen($words); $i < $len; $i++) {
        $char = mb_substr($words, $i, 1);
        if (isset($arrLetters[$char])) {
            $resultStr .= $arrLetters[$char];
        }
        else {
            $resultStr .= $char;
        }
    }
    echo $resultStr;
}

transliteration("я сегодня шла за картошкой в огород.", $letters);

// Задание 4

$values = [
    [
        'name' => 'Пункт 1',
        'child' => [[
            'name' => 'Пункт 1.1',
            'child' => [[
                'name' => 'Пункт 1.1.1'
            ]]
        ]]
    ],
    [
        'name' => 'Пункт 2',
        'child' => [[
            'name' => 'Пункт 2.1'
        ]]
    ]
];

echo '<h1>Задание 4</h1>';

function createMenu($menu) {
    echo '<ul>';
    foreach($menu as $point) {
        echo '<li>' . $point['name'];
        if (isset($point['child'])) {
            createMenu($point['child']);
        }
        echo '</li>';
    }
    echo '</ul>';
}

createMenu($values);

// Задание 6

echo '<h1>Задание 6</h1>';

function getCityWithK($value) {
    return mb_substr($value, 0, 1) == 'К' || mb_substr($value, 0, 1) == 'к';
}

function filterArray($value) {
    foreach($value as $key => $city) {
        $cityWithK = array_filter($city, 'getCityWithK');
        if (count($cityWithK) > 0) {
            $result2 = "<p>" . $key . ":</p>";
            $result2 .= implode(", ", $cityWithK);
            echo $result2;
        }
    }
}

filterArray($cities);


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Задание 18</title>
</head>
<body>
</body>
</html>