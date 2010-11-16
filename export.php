<?php

    header("Content-type: application/force-download");
    header("Content-Disposition: filename=dtt_export.csv");
    header("Pragma: no-cache");
    header("Expires: 0");

    print stripslashes($_GET['data']);

?>