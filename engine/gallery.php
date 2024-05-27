<?php
    include "logGallery.php";

    addInLog();

    define('BIG_DIR', '../public/img/big/');
    define('SMALL_DIR', '../public/img/small/');

    function getPictures() {
        $picturesBig = array_diff(scandir(BIG_DIR), [".", ".."]);
        $picturesSmall = array_diff(scandir(SMALL_DIR), [".", ".."]);
        $arrayPictures = [];

        foreach($picturesSmall as $pictureSmall) {
            $bigPictureKey = array_search($pictureSmall, $picturesBig);
            if ($bigPictureKey != false) {
                $bigPicture = $picturesBig[$bigPictureKey];
                $image = [
                    "smallPath" => "/img/small/" . $pictureSmall,
                    "bigPath" => "/img/big/" . $bigPicture
                ];
                array_push($arrayPictures, $image);
            }

            //$pictureBig = $picturesBig[array_search($pictureSmall, $picturesBig)];
            //echo '<a target="_blank" href="' . BIG_DIR . $pictureBig . '">
            //<img src="' . SMALL_DIR . $pictureSmall . '" alt="Картинка"></a>';
        }

        return $arrayPictures;
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

    function createNewPicture($file) {
        if (fileIsCorrect($file)) {
            $path = BIG_DIR . basename($file["name"]);
            if (move_uploaded_file($file["tmp_name"], $path)) {
                if ($file["type"] == "image/jpeg") {
                    $imageSmall = imagecreatefromjpeg($path);
                    $imageSmallScale = imagescale($imageSmall , 300);
                    imagejpeg($imageSmallScale, SMALL_DIR . $file["name"]);
                } else if ($file["type"] == "image/png"){
                    $imageSmall = imagecreatefrompng($path);
                    $imageSmallScale = imagescale($imageSmall , 300);
                    imagepng($imageSmallScale, SMALL_DIR . $file["name"]);
                } else {
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
?>