import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { ToastController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { MatDialog} from "@angular/material/dialog"
import { FormControl, FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  public regForm: FormGroup;
  error="";
  isSubmitted = false;
 
  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    public dialog:MatDialog,
  	private postPvdr: PostProvider,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public formBuilder: FormBuilder
  ) { 

    this.regForm = formBuilder.group({
      firstname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([ Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6),  Validators.required])],
      reg_num: ['', Validators.compose([Validators.required])],
      confirm_password: ['', Validators.compose([Validators.minLength(6),  Validators.required])],
      email: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required])],
      department: ['', Validators.compose([ Validators.required])],
  });
  }


  async close(){
    console.log('close')
    this.modalCtrl.dismiss()
  }

  get errorControl() {
    return this.regForm.controls;
  }
  async onSubmit(){
    this.isSubmitted = true;

    console.log(this.regForm.value['firstname'])





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
        image: 'user_images/test.jpg',       
        aksi: 'register'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        
        
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
          await loading.dismiss()
          const alert = await this.alertCtrl.create({
            header:'Error',
            message: data['msg'],
          });
          alert.present();
        }
      });



  

    // }
  
  }

  ngOnInit() {}

}
