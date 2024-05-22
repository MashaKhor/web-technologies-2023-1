<?php
    date_default_timezone_set("Asia/Yekaterinburg");
    $title = "Способ 3";
    $year = date("Y");

    $content = file_get_contents("htmlpattern.html");
    $content = str_replace("{{title}}", $title, $content);
    $content = str_replace("{{year}}", $year, $content);

    echo $content;
?>