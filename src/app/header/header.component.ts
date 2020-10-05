import { Component,OnChanges, OnInit,AfterViewInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PassageService } from '../passage.service';
import { MatDialog} from "@angular/material/dialog"
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { AlertController,ModalController, PopoverController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';
import {  } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit,OnChanges {
    all = [] as any;
  loadedall = [] as any;
  queryText;
  journals = [] as any;
  isSearching: boolean=false;
  matric:any;
  head;
  reg:any
  //loggedin=false

  @Output() messageEvent = new EventEmitter<string>();
  @Input() isOpened : boolean= false
  @Input() profilepage : boolean= false
  @Input() loggedin: boolean = false;
  password:any;
   constructor(public router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    public dialog:MatDialog,
    public ps:PassageService,	private postPvdr: PostProvider,) {
      
      let body3 = {
        aksi: 'all'
      };
  
      this.postPvdr.postData(body3, 'proses-api.php').subscribe(async data =>{
        //console.log(data.result['file_title']);
        for(let book of data['result']){
          this.loadedall.push(book);
        }
       
      });
      
      this.ngOnInit()
    }

    ngOnChanges(changes: SimpleChanges){

this.ngOnInit()

    }

  async ngOnInit() {
   
    
    const ret = await Storage.get({ key: 'userData' });
    const user = JSON.parse(ret.value);
    console.log(user)
    if(user==null){
      this.loggedin=false
      this.profilepage=false
    }else{
      this.reg=user['reg_number']
      this.loggedin=true
      
    }
    

  }


  profile(){
    var chars = "0123456789a?><|{}_+bcdefghiklmnopqrstuvwxyz";
    var string_length = 15;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
    }
      const data= {

  profid:randomstring,
  matric:this.reg
}
    this.router.navigate(['/profile'],{
      queryParams: data
      })
  }

     // this.matric= this.ps.getUser();
     async loginPop(){

      const modal = await this.modalController.create({
        component: LoginDialogComponent,
        cssClass: 'my-custom-modal-css',
        backdropDismiss: false,
      });
      modal.onDidDismiss()
      .then((data) => {
        const user = data.data;
        console.log(user['dismissed']) 
        this.loggedin=user['dismissed']
        this.reg =user['reg']
        // Here's your selected user!
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
    close(){
      console.log("cloose")
      this.isOpened=false;
      this.isSearching=false
      
     // this.isSearching=false;
     }
    bodyclick(){
      this.isOpened=false;
      this.isSearching=false;
      
    }
    search(){
      this.isOpened=true;
      
    }

    home(){
      this.router.navigate(['/home']);
    }
    database(){
      this.router.navigate(['/resources']);
    }
     ebook(){
      this.router.navigate(['/facultylist']);
    }
     journal(){
      this.router.navigate(['/journals']);
    }

    initializeItems(): void {
      
      this.all = this.loadedall;
      console.log(this.all)
      }
  
    update(evt){
   this.isSearching=true;
   this.initializeItems(); 
      
   const searchTerm = evt.srcElement.value;
   
   if (!searchTerm) {
   return;
   }
   
   this.all = this.all.filter(currentGoal => {
   if (currentGoal.file_title && searchTerm)  {
   if (currentGoal.file_title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
   return true;
   }
   return false;
   }
   });
    }
  
}
