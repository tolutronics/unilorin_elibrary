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




    $path = 'uploads/';
   
    if (isset($_FILES['files'])) {
      $dept = $_POST['department'];
      $file_type = $_POST['type'];
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
        $originalName = $_FILES['files']['name'][$i];
        $file_name = $_FILES['files']['name'][$i];
        $file_size = $_FILES['files']['size'][$i];
        $filePath = $path.$originalName;
        if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $filePath)) {
          
          function check_number($conn){

            $unique_number = rand(100000000, 999999999);
            $sql = "SELECT * FROM elibrary_books WHERE file_id='$unique_number'";
            $query=mysqli_query($conn,$sql);
            $numrow = mysqli_num_rows($query);
        
        
        
            if ($numrow >0){
              $file_id = check_number();
            }
             else{
                    $file_id = $unique_number;
                return $file_id;
             }
           
        
        }
      
          $file_id = check_number($conn);
          $sql= "INSERT INTO elibrary_books (file_id, file_title, file_url, file_count, department, created_at, file_type, file_size)
          VALUES ('$file_id','$file_name', '  $filePath', '0', '$dept', '$today', '$file_type', '$file_size')";
          $query=mysqli_query($conn, $sql);
      
          if($query) $result = json_encode(array('success'=>true));
          else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
      
          echo $result;
        }
      }
    }
    else {
      echo 
        array('status' => false, 'msg' => 'No file uploaded.')
      ;
      exit;
    }
 
  
   
 
  ?>