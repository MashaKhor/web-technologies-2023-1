<?php 
    include_once '../engine/ImageResize.php';
    include_once '../engine/ImageResizeException.php';
    use \Gumlet\ImageResize;

    $message = "";
    $messages = [
        "ok" => "Успешно загружен",
        "error" => "Ошибка загрузки",
    ];

    define('BIG_DIR', '../public/img/big/');
    define('SMALL_DIR', '../public/img/small/');

    if (!empty($_FILES)) {
        if (fileIsCorrect($_FILES["myfile"])) {
            $path = BIG_DIR . basename($_FILES["myfile"]["name"]);
            if (move_uploaded_file($_FILES["myfile"]["tmp_name"], $path)) {
                $imageSmall = new ImageResize($path);
              
                $pathSmall = SMALL_DIR . basename($_FILES["myfile"]["name"]);
                $imageSmall -> resizeToWidth(200);
                $imageSmall -> save($pathSmall);

                $message = "ok";
            }
            else {
                $message = "error";
            }
        }
        else {
            $message = "error";
        }

        header("Location: /?page=gallery&status=" . $message);
        die();
    }

    function fileIsCorrect($file){
        $uploadfile = BIG_DIR . basename($file["name"]);
        if (file_exists($uploadfile)) {
            echo "Файл с таким названием уже существует.";
            return false;
        } 
    
        if($file["size"] > 1024*10*1024) {
            echo "Размер файла не должен превышать 10МБ";
            return false;
        }
    
        if($file['type'] != "image/jpeg" && $file['type'] != "image/png") {
            echo "Тип файла должен быть только jpeg или png.";
            return false;
        }
    
        return true;
    }

    function getPictures() {
        $picturesBig = array_diff(scandir(BIG_DIR), [".", ".."]);
        $picturesSmall = array_diff(scandir(SMALL_DIR), [".", ".."]);

        foreach($picturesSmall as $pictureSmall) {
            $pictureBig = $picturesBig[array_search($pictureSmall, $picturesBig)];
            echo '<a target="_blank" href="' . BIG_DIR . $pictureBig . '">
            <img src="' . BIG_DIR . $pictureSmall . '" alt="Картинка"></a>';
        }
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<?= $message ?><br>
<form method="post" enctype="multipart/form-data">
    <input type="file" name="myfile">
    <input type="submit" value="Загрузить">
</form>

<?php
    getPictures();
?>
</body>
</html>