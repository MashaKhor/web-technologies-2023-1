<?php
    include "db.php";

    function getItems($db) {
        if ($db == false) {
            echo 'Не удалось подключиться к базе данных <br>';
            echo mysqli_connect_error();
            exit();
        }

        $result = mysqli_query($db, "SELECT * FROM listitem");
        $arrayResult = [];

        if (isset($result)) {
            while ($row = @mysqli_fetch_assoc($result)) {
                array_push($arrayResult, $row);
            }

            getResultDB($arrayResult, null);
        }
    }

    function getResultDB($array, $parentId) {
        foreach ($array as $item) {
            if ($item['parentId'] == $parentId) {
                echo '<div class="list-item list-item_open" data-parent>' .
                    '<div class="list-item__inner">' .
                    '<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down.png" data-open>' .
                    '<img class="list-item__folder" src="img/folder.png" alt="folder.png">' . $item['name'] . '</div>';
                echo '<div class="list-item__items">';
                getResultDB($array, $item['id']);
                echo '</div></div>';
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>List Item</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="list-items" id="list-items">
            <?= getItems($link) ?>
        </div>
        <script type="module" src="script.js"></script>
    </body>
</html>