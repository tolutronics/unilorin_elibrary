import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { IonSlides, AlertController,LoadingController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { PostProvider } from 'src/providers/post-provider';
import { ActivatedRoute, Router } from '@angular/router';
const { Storage } = Plugins;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements AfterViewInit  {
  email:any
  firstname:any
  lastname:any
  userImg:any
  user_id:any
  show:boolean=false
  files: File[] = [];
  file;
  reg:any
  @ViewChild('slides',{static:false}) slides: IonSlides;
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;
  loggedin:boolean=true
  profilepage:boolean=true
  confirm:boolean=false
  User=[] as any;
  downloaded = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    
  ]
  sliderConfig2={
   
    allowTouchMove:false,
    effect:"fade",
    lockSwipes:true,
    shortSwipes:false,
    longSwipes:false,
    // on: {
    //   beforeInit() {
    //     const swiper = this;
    //     swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
    //     const overwriteParams = {
    //       slidesPerView: 1,
    //       slidesPerColumn: 1,
    //       slidesPerGroup: 1,
    //       watchSlidesProgress: true,
    //       spaceBetween: 0,
    //       virtualTranslate: true,
    //     };
    //     swiper.params = Object.assign(swiper.params, overwriteParams);
    //     swiper.params = Object.assign(swiper.originalParams, overwriteParams);
    //   },
    //   setTranslate() {
    //     const swiper = this;
    //     const { slides } = swiper;
    //     for (let i = 0; i < slides.length; i += 1) {
    //       const $slideEl = swiper.slides.eq(i);
    //       const offset$$1 = $slideEl[0].swiperSlideOffset;
    //       let tx = -offset$$1;
    //       if (!swiper.params.virtualTranslate) tx -= swiper.translate;
    //       let ty = 0;
    //       if (!swiper.isHorizontal()) {
    //         ty = tx;
    //         tx = 0;
    //       }
    //       const slideOpacity = swiper.params.fadeEffect.crossFade
    //         ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
    //         : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
    //       $slideEl
    //         .css({
    //           opacity: slideOpacity,
    //         })
    //         .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
    //     }
    //   },
    //   setTransition(duration) {
    //     const swiper = this;
    //     const { slides, $wrapperEl } = swiper;
    //     slides.transition(duration);
    //     if (swiper.params.virtualTranslate && duration !== 0) {
    //       let eventTriggered = false;
    //       slides.transitionEnd(() => {
    //         if (eventTriggered) return;
    //         if (!swiper || swiper.destroyed) return;
    //         eventTriggered = true;
    //         swiper.animating = false;
    //         const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
    //         for (let i = 0; i < triggerEvents.length; i += 1) {
    //           $wrapperEl.trigger(triggerEvents[i]);
    //         }
    //       });
    //     }
    //   },
    // }
  }
  constructor(public activatedRoute : ActivatedRoute,public postPvdr:PostProvider, public ngZone:NgZone, public loadingCtrl:LoadingController, public alert:AlertController, public router:Router) {

    this.activatedRoute.queryParams.subscribe(async res => {
      this.reg= await res.matric;
      console.log(this.reg)
      this.getdata(this.reg)
 
  }); 

   }

   async getdata(reg:any){
    let body = {
      aksi:'getUser',
      reg_number:reg
    }
     this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
     
      this.User= await data['result']
      console.log(this.User)
      this.firstname=this.User['firstname']
      this.lastname=this.User['lastname']
      this.email=this.User['email_address']
      this.userImg=this.User['user_image']
      this.reg=this.User['reg_number']
      this.user_id=this.User['user_id']
 
     });
   }
   

 
  ngAfterViewInit() {
    this.barChartMethod();

  }

  async logout(){
    const loading = await this.loadingCtrl.create({
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
    await Storage.clear().then(async ()=>{
      await loading.onDidDismiss().then(()=>{
        var q ={
          loggedin:false,
         // filetype:'E-journals'
        }
        this.ngZone.run(() => { this.router.navigate(['home'], {
          queryParams:q,
        }) })
        
      })
      
    })
  }

  async logoutAlert(){
    const alert = await this.alert.create({
      header:'Warning',
      message:'Are you sure you want to logout?',
      backdropDismiss:false,
      buttons:[
        {
          text:'YES',
          role:'ok',
          handler:(data)=>{
            this.logout()
          }
        },
          {
          text:'NO',
          role:'cancel',
          handler:async (data)=>{
            await alert.dismiss()
          }
        }
        
      ]
    });
    await alert.present()
   


  }
  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ebooks', 'Journals', 'Papers'],
        datasets: [{
          label: '# of Downloads',
          data: [200, 50, 30],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  

  async profile(){
    const loading = await this.loadingCtrl.create({
      duration:1000,
      spinner: 'bubbles'
    });
    await loading.present();
    await loading.onDidDismiss().then(()=>{
      this.slides.slideTo(0,1000)
    })
    
  }

  home(){
this.router.navigate(['/home'])
  }

  async statistics(){
    const loading = await this.loadingCtrl.create({
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
        await loading.onDidDismiss().then(()=>{
      this.slides.slideTo(1,1000)
    })
  }

  async settings(){
    const loading = await this.loadingCtrl.create({
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
    await loading.onDidDismiss().then(()=>{
      this.slides.slideTo(2,1000)
    })
  }

  async emailChange(){
    const alert = await this.alert.create({
      header: 'New Email',
      inputs: [
        {
          name: 'myEmail',
          type:'email',
          placeholder:'Email'
        }
      ],
      buttons:[
        {
          text:'Update',
          role:"update",
          handler: (data)=>{
            this.updateEmail(data.myEmail)
          }
        }
      ]
    });
    await alert.present()

  }

  async updateEmail(email:any){

    if(email!==""){
      this.email=email;
      let body = {
        aksi:'updateEmail',
        email:email,
        reg_number:this.reg
      }
      console.log(body)
      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
console.log(data)
if(data['success']==true){
  this.Alert(data['msg'],'Success')
}else{
  this.Alert(data['msg'],'Error')
}
      })

    }else{
      this.Alert('Please fill in your Email','Error')
    }

     
  }

  async passwordChange(){

    const alert = await this.alert.create({
      header: 'Change Password',
      inputs: [
        {
          name: 'oldpassword',
          type:'password',
          placeholder:'Old Password'
        },
        {
          name: 'newpassword',
          type:'password',
          placeholder:'New Password'
        }
      ],
      buttons:[
        {
          text:'Update',
          role:"update",
          handler: (data)=>{
            this.UpdatePassword(data.oldpassword,data.newpassword)
            console.log('testing '+data.oldpassword,data.newpassword)
          }
        }
      ]
    });
    await alert.present()
    
  }

  UpdatePassword(oldpassword:any,newpassword:any){

   
    let body = {
      aksi:'updatePassword',
      newpassword:newpassword,
      checkpassword:this.User['password'],
      oldpassword:oldpassword,
      reg_number:this.reg
    }
    console.log(body)
    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
console.log(data)
if(data['success']==true){
  this.Alert(data['msg'],'Success')
}else{
  this.Alert(data['msg'],'Error')
}
    })
  }

  async downloads(){
    const loading = await this.loadingCtrl.create({
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
    await loading.onDidDismiss().then(()=>{
      this.slides.slideTo(3,1000)
    })
  }

async Alert(msg:any,header:any){

  const loading = await this.loadingCtrl.create({
      duration: 500,
      spinner: 'bubbles'
    });
    await loading.present();
    await loading.onDidDismiss().then(async ()=>{
      const alert = await this.alert.create({
        header:header,
        message:msg,
        backdropDismiss:false,
        buttons:[
          {
            text:'OK',
            role:'ok',
            handler:(data)=>{
              
            }
          }
        ]

})
await alert.present();
    })

  
}
async upload(){
 
  const url = 'http://localhost/elibrary/server_api/update.php';
    const formData = new FormData()
   
     
    for (let i = 0; i < this.files.length; i++) {
      this.file= this.files[i];
     // console.log(file);
     // this.filename[i]=this.files[i].name;
     
      formData.append('files[]', this.file);
       formData.append('user_id', this.user_id)
      
    }

        // let body={
        //   files:this.files,
        //   user_id:this.user_id
        // }
 

       await fetch(url, {
        method: 'POST',
        body: formData
    }).then(async response => {
      console.log(response)
      console.log(this.reg)
     await this.getdata(this.reg)
      if(response['status']==200){
        this.show=false
      }
    })

}
async onDrop(files:any){
this.show=true
this.confirm=true
  this.files=files

  this.upload()
       
  }
 
}