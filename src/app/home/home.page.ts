import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { PassageService } from '../passage.service';
import { ActivatedRoute } from '@angular/router';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog} from "@angular/material/dialog"
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;


import { PostProvider } from 'src/providers/post-provider';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  status:any;
  loggedin : boolean= false
  //loggedin=false;
 isOpened : boolean= false;
  message:any;
  ebooks = [] as any;
  all = [] as any;
  loadedall = [] as any;
  queryText;
  journals = [] as any;
  isSearching: boolean=false;
  filename={} as any;
         topStories: any[]=[
  
        // {
        //   id:1,
        //   image:"assets/img/background4.jpg",
        // },
      
        {
          id:1,
          image:"assets/img/background6.jpg",
        },
      
        {
          id:1,
          image:"assets/img/background4.jpg",
        },

        {
          id:1,
          image:"assets/img/background1.jpg",
        },
      
        
      
       
        ]
        slideOptsOne = {
          initialSlide: 0,
          slidesPerView: 1,
          autoplay:true,
          speed:400
         };
         matric:any;
         stat:String;
         name:any;
         fname:any;
         display:boolean=true;
  constructor(
    public modalController: ModalController, 
    private postPvdr:PostProvider,
    public ps:PassageService,
     public dialog:MatDialog,
    public router: Router,
    public popoverController: PopoverController,
    public activatedRoute : ActivatedRoute,) {
     
      
      this.checkUser()
      

  }

 

  async checkUser(){
    this.activatedRoute.queryParams.subscribe((res)=>{
      this.loggedin = res['loggedin'];
      console.log(this.loggedin + ' recieved')
    })
    console.log('im bacvk oo')
    const ret = await Storage.get({ key: 'userData' });
      const user = JSON.parse(ret.value);
      console.log(user)
      if(user==null){
        this.loggedin=false
      }else{
        this.loggedin=true
      }
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  
  async loginPop(){

    const modal = await this.modalController.create({
      component: LoginDialogComponent,
      cssClass: 'my-custom-modal-css',
      backdropDismiss: false,
    });
    return await modal.present();
      }
    
      async registerPop(){
        const modal = await this.modalController.create({
          component: RegisterDialogComponent,
          cssClass: 'my-custom-class',
          backdropDismiss: false
        });
        return await modal.present();
      
    
       
            
          }

  bodyclick(){
    this.isOpened=false;
    this.isSearching=false;
    
  }
 

 



  jgoto(){
    this.router.navigate(['/journals']);
  }

  sgoto(){
    this.router.navigate(['/facultylist']);
  }

  locate(ev:any, ev2:any){

if(ev=="E-books"){
  var q ={
    dept:ev2,
    filetype:'E-books'
  }
  this.router.navigate(['/store'], {
    queryParams:q,
  });
}

else if(ev=="E-journals"){
  var q ={
    dept:ev2,
    filetype:'E-journals'
  }
  this.router.navigate(['/jbank'], {
    queryParams:q,
  });
}
  }

  ngOnInit() {

   

     this.checkUser()
    let body1 = {
      type:'E-books',
      aksi: 'efetch'
    };

    let body2 = {
      type:'E-journals',
      aksi: 'jfetch'
    };

    this.postPvdr.postData(body1, 'proses-api.php').subscribe(async data =>{
      //console.log(data.result['file_title']);
      for(let book of data['result']){
        this.ebooks.push(book);
      }
     
    });

    this.postPvdr.postData(body2, 'proses-api.php').subscribe(async data =>{
      //console.log(data.result['file_title']);
      for(let book of data['result']){
        this.journals.push(book);
      }
     
    });
 


  
  }
}







