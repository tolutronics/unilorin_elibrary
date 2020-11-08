import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController,AlertController,LoadingController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  error="";
 
  loginForm = new FormGroup({
    reg_num: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(public postPvdr:PostProvider,
     public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController) { }

  ngOnInit() {}

  close(){
    console.log('close')
    this.modalCtrl.dismiss()
  }
  async onLogin(){
    this.loginForm.value
    const loading = await this.loadingCtrl.create({
      duration: 100000,
      spinner: 'bubbles'
    });
    await loading.present();
    let body = {
      matric: this.loginForm.value['reg_num'],
      password: this.loginForm.value['password'],
      aksi: 'login'
    };

    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{

        var user=[]
        var reg=null
        var user_id=null
        var name=null
        if(data['success'] ){
          await loading.dismiss()

         user = data['result']
          reg=user['reg_number'],
          user_id=user['user_id'],
          name = `${user['firstname']}+' '+ ${user['lastname']}`
          
          this.modalCtrl.dismiss({
            'dismissed': true,
              'reg':reg
          });
          this.setUserData(reg,name,user_id)
          // const alert = await this.alertCtrl.create({
          //   header: 'Success',
          //     message: 'Registered succesfully, you can log in now',
          //     buttons: ['OK']
          //   });
          //   alert.present();

          }else{
            await loading.dismiss()
            const alert = await this.alertCtrl.create({
              header:'Error',
              message: data['msg'],
            });
            alert.present();
          }
        });
        

    
  }

  async setUserData(reg:any, name:any,user_id:any) {
  await Storage.set({
    key: 'userData',
    value: JSON.stringify({
      reg_number: reg,
      name: name,
      user_id:user_id
    })
  });
}

}
