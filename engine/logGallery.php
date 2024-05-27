<?php
function addInLog() {
    date_default_timezone_set("Asia/Yekaterinburg");
    $nowDate = date("Y-m-d H:i:s") . PHP_EOL;
    $file = '../engine/log/log.txt';
    if (count(file($file)) >= 10) {
        $countFiles = count(array_slice(scandir('../engine/log'), 3));
        rename($file, '../engine/log/log' . $countFiles . '.txt');
    }
    file_put_contents($file, $nowDate, FILE_APPEND);
}
?>