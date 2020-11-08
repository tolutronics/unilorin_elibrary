<?php
 $dbhost = 'localhost';
 $dbuser = 'root';
 $dbpass = '';
 $dbname = 'db_elibrary';
 $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
 $postjson = json_decode(file_get_contents('php://input'), true); 
 $today=date('Y-m-d');


 //echo $today;

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: *"); 
  header("Content-Type: application/json, charset=utf-8");




  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
  }

   
    $path = 'user_images/';
    


    if (isset($_FILES['files'])) {

      $user_id = $_POST['user_id'];
      print_r($_FILES['files']);
      if (!is_writable($path)) {
        echo json_encode(array(
          'status' => false,
          'msg'    => 'Destination directory not writable.'
        ));
        exit;
      }
   
      
      $all_files = count($_FILES['files']['tmp_name']);
      for ($i = 0; $i < $all_files; $i++) {
        $file_size = $_FILES['files']['size'][$i];
        $file_name = $_FILES['files']['type'][$i];
      $filePath = $path.$user_id.'.jpg';
      if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $filePath)) {
       
        $sql= "UPDATE elibrary_users SET user_image = '$filePath' WHERE user_id='$user_id'";
        $query=mysqli_query($conn, $sql);
    
        if($query) $result = json_encode(array('success'=>true));
        else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
    
        echo $result;
      }
   }
  }

 
  
   
 
  ?>