<?php
 $dbhost = 'localhost';
 $dbuser = 'root';
 $dbpass = '';
 $dbname = 'db_elibrary';
 $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
 $postjson = json_decode(file_get_contents('php://input'), true); 
 $today=date('Y-m-d');
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: *"); 
  header("Content-Type: application/json, charset=utf-8");
 

  if($postjson['aksi']=="register"){
    function check_number($conn){

      $unique_number = rand(100000000, 999999999);
      $sql = "SELECT * FROM elibrary_users WHERE user_id='$unique_number'";
      $query=mysqli_query($conn,$sql);
      $numrow = mysqli_num_rows($query);
  
  
  
      if ($numrow >0){
        $user_id = check_number();
      }
       else{
              $user_id = $unique_number;
          return $user_id;
       }
     
  
  }

    $user_id = check_number($conn);

    $email = $postjson['email'];

    $sql = "SELECT * FROM elibrary_users WHERE email_address='$email'";
    $query=mysqli_query($conn,$sql);
    $numrow = mysqli_num_rows($query);
 

    if (!$numrow >0) {
    $fname = $postjson['fname'];
    $lname = $postjson['lname'];
    $matric = $postjson['matric'];
    $department = $postjson['department'];
    $pass = md5($postjson['password']);
    $image =$postjson['image']; 

   $sql= "INSERT INTO elibrary_users (user_id,firstname, lastname, reg_number, email_address, department, password, user_image)
    VALUES ('$user_id','$fname', '$lname', '$matric', '$email', '$department', '$pass', '$image')";

   $query=mysqli_query($conn, $sql);

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
    }
    else{
      $result = json_encode(array('success'=>false, 'msg'=>'Email Already Exist'));
    }
    echo $result;
  }

  if($postjson['aksi']=="upload"){
    $file_name = $postjson['filename'];
    $file_name =strtolower($file_name);
    $file_name = ucfirst($file_name);
    $path= "http://localhost/ionic-sites";
    move_uploaded_file($file_name, $path);
    $department= $postjson['dselected'];
    $created_at = $today;
    $file_count = '0';

    $sql= "INSERT INTO elibrary_books (file_title, file_url, file_count, department, created_at)
    VALUES ('$file_name', ' $path', '$file_count', '$department', '$created_at')";
    $query=mysqli_query($conn, $sql);

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));

    echo $result;


  }

  elseif($postjson['aksi']=="fetch"){
    $data = array();
$dept =$postjson['dselected'];
$file_type =$postjson['type'];

    $sql =  "SELECT * FROM elibrary_books WHERE department='$dept' AND file_type='$file_type'";
    $query=mysqli_query($conn,$sql);
    
   
    while($row = mysqli_fetch_array($query)){
      $data[] = array(
        'file_id'=> $row['file_id'],
        'file_title'=> $row['file_title'],
        'file_url'  => $row['file_url'],
        'file_count'=> $row['file_count'],
        'department'=> $row['department'],
        'created_at'=> $row['created_at'],
        'file_type'=> $row['file_type'],
        'file_size'=> $row['file_size'],
      );
    }
    if($query) $result =json_encode(array('success'=>true, 'result'=>$data));
    else $result =json_encode(array('success'=>false, 'result'=> mysqli_error($conn) ));
    echo $result;
  }

  elseif($postjson['aksi']=="all"){
    $data = array();

    $sql =  "SELECT * FROM elibrary_books";
    $query=mysqli_query($conn,$sql);
    
   
    while($row = mysqli_fetch_array($query)){
      $data[] = array(
        'file_id'=> $row['file_id'],
        'file_title'=> $row['file_title'],
        'file_url'  => $row['file_url'],
        'file_count'=> $row['file_count'],
        'department'=> $row['department'],
        'created_at'=> $row['created_at'],
        'file_type'=> $row['file_type'],
        'file_size'=> $row['file_size'],
      );
    }
    if($query) $result =json_encode(array('success'=>true, 'result'=>$data));
    else $result =json_encode(array('success'=>false, 'result'=> mysqli_error($conn) ));
    echo $result;
  }

  elseif($postjson['aksi']=="fetch2"){
    $data = array();
$dept =$postjson['dselected'];
$file_type =$postjson['type'];

    $sql =  "SELECT * FROM elibrary_books WHERE department='$dept' AND file_type='$file_type'";
    $query=mysqli_query($conn,$sql);
    
   
    while($row = mysqli_fetch_array($query)){
      $data[] = array(
        'file_id'=> $row['file_id'],
        'file_title'=> $row['file_title'],
        'file_url'  => $row['file_url'],
        'file_count'=> $row['file_count'],
        'department'=> $row['department'],
        'created_at'=> $row['created_at'],
        'file_type'=> $row['file_type'],
        'file_size'=> $row['file_size'],
      );
    }
    if($query) $result =json_encode(array('success'=>true, 'result'=>$data));
    else $result =json_encode(array('success'=>false, 'result'=> mysqli_error($conn) ));
    echo $result;
  }

    elseif($postjson['aksi']=="efetch"){
    $data = array();

$file_type =$postjson['type'];

    $sql =  "SELECT * FROM elibrary_books WHERE file_type='$file_type' LIMIT 10";
    $query=mysqli_query($conn,$sql);
    
   
    while($row = mysqli_fetch_array($query)){
      $data[] = array(
        'file_id'=> $row['file_id'],
        'file_title'=> $row['file_title'],
        'file_url'  => $row['file_url'],
        'file_count'=> $row['file_count'],
        'department'=> $row['department'],
        'created_at'=> $row['created_at'],
        'file_type'=> $row['file_type'],
        'file_size'=> $row['file_size'],
      );
    }
    if($query) $result =json_encode(array('success'=>true, 'result'=>$data));
    else $result =json_encode(array('success'=>false, 'result'=> mysqli_error($conn) ));
    echo $result;
  }

  elseif($postjson['aksi']=="jfetch"){
    $data = array();
$file_type =$postjson['type'];

    $sql =  "SELECT * FROM elibrary_books WHERE file_type='$file_type' LIMIT 10";
    $query=mysqli_query($conn,$sql);
    
   
    while($row = mysqli_fetch_array($query)){
      $data[] = array(
        'file_id'=> $row['file_id'],
        'file_title'=> $row['file_title'],
        'file_url'  => $row['file_url'],
        'file_count'=> $row['file_count'],
        'department'=> $row['department'],
        'created_at'=> $row['created_at'],
        'file_type'=> $row['file_type'],
        'file_size'=> $row['file_size'],
      );
    }
    if($query) $result =json_encode(array('success'=>true, 'result'=>$data));
    else $result =json_encode(array('success'=>false, 'result'=> mysqli_error($conn) ));
    echo $result;
  }

elseif($postjson['aksi']=="DeptFetch"){
    $data = array();

$depatment =$postjson['dept'];

    $sql =  "SELECT * FROM $depatment";
    $query=mysqli_query($conn,$sql);
    
   
    while($row = mysqli_fetch_array($query)){
      $data[] = array(
        'department'=> $row['departments'],
       
      );
    }



    if($query) $result =json_encode(array('success'=>true, 'result'=>$data));
    else $result =json_encode(array('success'=>false, 'result'=> mysqli_error($conn) ));
    echo $result;
  }

 elseif($postjson['aksi']=="FacFetch"){
    $data = array();


    $sql =  "SELECT * FROM faculty";
    $query=mysqli_query($conn,$sql);
    
   
    while($row = mysqli_fetch_array($query)){
      $data[] = array(
        'faculty'=> $row['faculties'],
       
      );
    }
    if($query) $result =json_encode(array('success'=>true, 'result'=>$data));
    else $result =json_encode(array('success'=>false, 'result'=> mysqli_error($conn) ));
    echo $result;
  }



  elseif($postjson['aksi']=="updateStat"){
    $pass =md5($postjson['password']);
    $matric=$postjson['matric'];
  $sql= "UPDATE elibrary_user SET stat = 'N' WHERE matric='$matric'  AND pass ='$pass'";
  $query = mysqli_query($conn,$sql);
  if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
  else $result = json_encode(array('success'=>false, 'result'=>'error'));

  echo $result;

  }


 elseif($postjson['aksi']=="logout"){

    $matric=$postjson['matric'];
  $sql= "UPDATE elibrary_user SET stat = 'y' WHERE matric='$matric'";
  $query = mysqli_query($conn,$sql);
  if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
  else $result = json_encode(array('success'=>false, 'result'=>'error'));

  echo $result;

  }


  elseif($postjson['aksi']=="count"){
    $data = array();
    $file_type =$postjson['type'];
    $file_title =$postjson['file_title'];
    $user_id =$postjson['user_id'];
    $file_id =$postjson['file_id'];
    $file_size =$postjson['file_size'];
    $file_url =$postjson['file_url'];
    $download_date =$today;
    $dept=$postjson['dselected'];
  $sql= "UPDATE elibrary_books SET file_count = file_count+1 WHERE department='$dept' AND file_id ='$file_id'";
  $query = mysqli_query($conn,$sql);
  if($query){
    $sql2= "INSERT INTO download_history (file_id,user_id, file_title, file_type, file_size, file_url, download_date)
    VALUES ('$file_id','$user_id', '$file_title', '$file_type', '$file_size', '$file_url', '$download_date')";

   $query2=mysqli_query($conn, $sql2);

   if ($query2) {
    $rsql =  "SELECT * FROM elibrary_books WHERE department='$dept' AND file_type='$file_type'";
    $rquery=mysqli_query($conn,$rsql);
    
   
    while($row = mysqli_fetch_array($rquery)){
      $data[] = array(
        'file_id'=> $row['file_id'],
        'file_title'=> $row['file_title'],
        'file_url'  => $row['file_url'],
        'file_count'=> $row['file_count'],
        'department'=> $row['department'],
        'created_at'=> $row['created_at'],
        'file_type'=> $row['file_type'],
        'file_size'=> $row['file_size'],
      );
    }
    if($rquery) $result =json_encode(array('success'=>true, 'result'=>$data));
    else $result =json_encode(array('success'=>false, 'result'=> mysqli_error($conn) ));
    
   } else {
    $result = json_encode(array('success'=>false, 'msg'=>'error'));
   }
   

  } 
  else {
    $result = json_encode(array('success'=>false, 'result'=>'error'));
  }

  echo $result;

  }

  elseif($postjson['aksi']=="getUser"){
    $matric = $postjson['reg_number'];

    $sql =  "SELECT * FROM elibrary_users WHERE reg_number='$matric'";
   $query=mysqli_query($conn,$sql);
   $numrow = mysqli_num_rows($query);
   if($numrow >0){
    $data = mysqli_fetch_assoc($query);
    
   echo json_encode(array('success'=>true, 'result'=>$data));
   //mysqli_close($con);
}else{
   echo json_encode(array('success'=>false, 'msg'=>'Invalid Login Details'));
}
  }

  elseif($postjson['aksi']=="updateEmail"){
    $email =$postjson['email'];
    $matric=$postjson['reg_number'];
  $sql= "UPDATE elibrary_users SET email_address = '$email'  WHERE reg_number='$matric'";
  $query = mysqli_query($conn,$sql);
  if($query) $result = json_encode(array('success'=>true, 'msg'=>'Email successfully updated'));
  else $result = json_encode(array('success'=>false, 'msg'=>'unable to update password'));

  echo $result;

  }

  elseif($postjson['aksi']=="updatePassword"){

    $oldpassword = md5($postjson['oldpassword']);
    $checkpassword =$postjson['checkpassword'];
    $newpassword =md5($postjson['newpassword']);
    $matric=$postjson['reg_number'];
    if ($oldpassword==$checkpassword) {
      if ($oldpassword !== $newpassword) {
        $sql= "UPDATE elibrary_users SET password = '$newpassword'  WHERE reg_number='$matric'";
        $query = mysqli_query($conn,$sql);
        if($query) $result = json_encode(array('success'=>true, 'msg'=>'Password Successfully Changed'));
        else $result = json_encode(array('success'=>false, 'msg'=>'Unable to Change Password'));
      }else{
        $result = json_encode(array('success'=>false, 'msg'=>'Old password cannot be reused'));
      }
      
    }else {
      $result = json_encode(array('success'=>false, 'msg'=>'Old password incorrect'));
    }
 

  echo $result;

  }
  elseif($postjson['aksi']=="login"){
   $pass= md5($postjson['password']);

   $sql=("SELECT * FROM elibrary_users WHERE reg_number='$postjson[matric]' AND  password='$pass'");

         $query=mysqli_query($conn,$sql);
         $numrow = mysqli_num_rows($query);
         if($numrow >0){
         $data = mysqli_fetch_assoc($query);
         
         $result=  json_encode(array('success'=>true, 'result'=>$data));
         
     }else{
         $result= json_encode(array('success'=>false, 'msg'=>'Invalid Login Details'));
     }
       echo $result;

 }


  


?>