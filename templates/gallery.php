<?php
    $message = "";
    $messages = [
        "ok" => "Успешно загружен",
        "error" => "Ошибка загрузки",
    ];

    if (!empty($_FILES)) {
        if (createNewPicture($_FILES["myfile"])) {
            $message = "ok";
        } else {
            $message = "error";
        }

        header("Location: /?page=gallery&status=" . $message);
        die();
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="../public/css/style.css">
</head>
<body>
<?= $message ?><br>
<form class="form-add-picture" method="post" enctype="multipart/form-data">
    <div>Загрузите новую картинку!</div>
    <input type="file" name="myfile">
    <input class="button" type="submit" value="Загрузить">
</form>

<div class="gallery">
    <?php foreach ($pictures as $picture): ?>
        <div>
            <a target="_blank" href="<?=$picture['bigPath']?>">
                <img src="<?=$picture['smallPath']?>" alt="Картинка">
            </a>
        </div>
    <?php endforeach; ?>
</div>
</body>
</html>