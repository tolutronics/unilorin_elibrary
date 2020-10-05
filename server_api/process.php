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

  if ($postjson[aksi]=='update') {
    $path = 'user_images/';

    if (isset($_FILES['image'])) {
      $dept = $_POST['department'];
      $file_type = $_POST['type'];
  print_r($_FILES['image']);
      if (!is_writable($path)) {
        echo json_encode(array(
          'status' => false,
          'msg'    => 'Destination directory not writable.'
        ));
        exit;
      }
      $file_name = $_FILES['image']['name'];
      $file_size = $_FILES['image']['size'];
      $filePath = $path.$file_name;

      if (move_uploaded_file($_FILES['image']['tmp_name'], $filePath)) {
        echo array(
          'status'        => true,
          'originalName'  => $originalName
          
        );
        $sql= "UPDATE elibrary_user SET user_image = $filePath WHERE matric='$matric'  AND pass ='$pass'";
        $query=mysqli_query($conn, $sql);
    
        if($query) $result = json_encode(array('success'=>true));
        else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
    
        echo $result;
      }
    }

  }

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
        echo array(
          'status'        => true,
          'originalName'  => $originalName
          
        );
        $sql= "INSERT INTO elibrary_books (file_title, file_url, file_count, department, created_at, file_type, file_size)
        VALUES ('$file_name', '  $filePath', '0', '$dept', '$today', '$file_type', '$file_size')";
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


















































































































































































































































































































































































































































































































































































































































































































































































      
  }
//     if (isset($_FILES['files'])) {
//         $errors = [];

//        // $path = 'uploads/';
//         $extensions = ['jpg', 'jpeg', 'png', 'gif'];
//         $path = getcwd().DIRECTORY_SEPARATOR ;
//         $dept = 'electrical';
//         $file_type = 'Ebook';
//         $all_files = count($_FILES['files']['tmp_name']);

//         for ($i = 0; $i < $all_files; $i++) {
//          $file_name = $_FILES['files']['name'][$i];
//             $file_tmp = $_FILES['files']['tmp_name'][$i];
//            echo ($file_temp);
//           //  $file_type = $_FILES['files']['type'][$i];
//             $file_size = $_FILES['files']['size'][$i];
//            // $file_ext = strtolower(end(explode('.', $_FILES['files']['name'][$i])));

//            $filepath = '/assets/book/'.$file_name;

//             // if (!in_array($file_ext, $extensions)) {
//             //     $errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
//             // }

//             // if ($file_size > 2097152) {
//             //     $errors[] = 'File size exceeds limit: ' . $file_name . ' ' . $file_type;
//             // }


//             $file_size = ceil($file_size/1024);

//               if (empty($errors)) {

//  //print_r($_FILES['files']['tmp_name']);
//               move_uploaded_file($_FILES['files']['tmp_name'],'/assets/book/'.$file_name);
// //echo $filepath;
//  $demo ='/assets/book/'.$file_name;
// //$demo = realpath($file_name);
//      $sql= "INSERT INTO elibrary_books (file_title, file_url, file_count, department, created_at, file_type, file_size)
//     VALUES ('$file_name', '  $demo', '0', '$dept', '$today', '$file_type', '$file_size')";
//     $query=mysqli_query($conn, $sql);

//     if($query) $result = json_encode(array('success'=>true));
//     else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));

//     echo $result;
//             }else{
//             }
//         }

//         if ($errors) print_r($errors);
//     }
// }


?>