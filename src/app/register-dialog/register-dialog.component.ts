import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { ToastController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { MatDialog} from "@angular/material/dialog"
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  
  error="";
 
  regForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    department: new FormControl(''),
    reg_num: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    
});
  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    public dialog:MatDialog,
  	private postPvdr: PostProvider,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController
  ) { }


  async close(){
    console.log('close')
    this.modalCtrl.dismiss()
  }


  async onSubmit(){
   // this.close() 
    //this.presentLoading()
    console.log(this.regForm.value['firstname'])

//     this.error="";
//     // validation done
//     if(this.fname=="" || this.lname=="" ){
//       this.error="Username is Required";
//     }
    
//     else if(this.fname=="admin" ||  this.lname=="admin" ){
//       this.error="Name not acceptable";
      
//   }else if(this.password==""){
//     this.error="Password is Required";
//     }else if(this.email==""){
//       this.error="Email is Required";

//   }else if(this.matric==""){
//     this.error="Matric/Staff Number is Required";

// }
// else if(this.matric=="elibadmin" || this.matric=="admin" || this.matric=="elib@admin"){
//   this.error="This is neither a matric number nor Staff number";

// }

//   else if(this.department==""){
//     this.error="department is Required";

// }

// else if(!this.email.includes('@')){
//   this.error="Invalid Email";

// }
// else if(this.password.length < 7){
//   this.error="Password must be greater than 6 characters";
  
// }
    
//     else if(this.password!=this.confirm_password){
//       this.error="Password does not match";
  
//     }else{

  const loading = await this.loadingCtrl.create({
    duration: 100000,
    spinner: 'bubbles'
  });
  await loading.present();

      let body = {
        fname: this.regForm.value['firstname'],
        lname:this.regForm.value['lastname'],
        password: this.regForm.value['password'],
        email: this.regForm.value['email'],
        department: this.regForm.value['department'],
        matric: this.regForm.value['reg_num'], 
        image: '',       
        aksi: 'register'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        
        var alertpesan:string = data['msg'];
        if(alertpesan.includes('Duplicate entry')){
          alertpesan=`User with the matric number ${this.regForm.value['reg_num']} already existed`
        }
        if(data['success']){
           
          await loading.dismiss()
          this.close()
         const alert = await this.alertCtrl.create({
          header: 'Success',
            message: 'Registered succesfully, you can log in now',
            buttons: ['OK']
          });
          alert.present();
        }else{
          console.log(alertpesan)
          await loading.dismiss()
          const alert = await this.alertCtrl.create({
            header:'Error',
            message: alertpesan,
          });
          alert.present();
        }
      });

    // }
  
  }

  ngOnInit() {}

}
