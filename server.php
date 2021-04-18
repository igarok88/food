<?php
$_POST = json_decode(file_get_contents("php://input"), true);// все что приходит от клиента, мы будем декодировать
echo var_dump($_POST);