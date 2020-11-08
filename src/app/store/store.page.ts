import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';
import { Filesystem, FilesystemDirectory, Plugins } from '@capacitor/core';
import '@capacitor-community/http';
const { Storage } = Plugins;
const { Http } = Plugins;

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  @Input() loggedin : boolean= false
  ebooks = [] as any;
  loadedebooks = [] as any;
  dept:any;
  keypath;
  result;
  filename={} as any;
  res={} as any;
  url={} as any;
  isOpened : boolean= false;
  nodata : boolean= false;
  lent;
  i=0;
  queryText: any;
  dep;
  user_id:any;
  type;
  count;
  status:any;
  matric:any;
  display:any;
  searchstate:any;
  message:any;
  constructor(private toastCtrl:ToastController,private postPvdr:PostProvider,private alertController: AlertController,public router:Router,public activatedRoute : ActivatedRoute) { 


this.checkUser()


  }

  async checkUser(){
    // this.activatedRoute.queryParams.subscribe((res)=>{
    //   this.loggedin = res['loggedin'];
    //   console.log(this.loggedin + ' recieved')
    // })
    const ret =  await Storage.get({ key: 'userData' });
    const user = JSON.parse(ret.value);
    this.user_id=user['user_id'];
    console.log(user)
    console.log(this.user_id)
    if(user==null){
      this.loggedin=false
      this.presentAlert('Please Log in', "You can't access this page");
    }else{
      this.loggedin=true
    }
  }
  receiveMessage($event) {
    this.message = $event
    if (this.message=='open') {
      this.isOpened=true;
    }else{
      this.isOpened=false;
    }
  }


  async presentAlert(msg:string, sub:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: sub,
      message: msg,
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: data => {
           this.router.navigateByUrl('/');
           this
          }
        },
      ]
    });

    await alert.present();
  }

  close(){
    this.isOpened=false;
   }

  
  download(file_id:any,file_size:any,file_url:any,file_title:any){

    console.log(file_id)
    console.log(file_size)
    console.log(file_url)
    console.log(file_title)
    console.log(this.dep)
    

    let body = {
      file_id: file_id,
      user_id: this.user_id,
      file_size: file_size,
      file_url:file_url,
      type:'E-books',
      file_title: file_title,
      dselected:this.dep,
      aksi: 'count',
    };
    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
      console.log(data['result']);

      if(data["success"]==true){
        
        for (let i = 0; i < data['result'].length; i++) {
          
          this.ebooks[i]['file_count'] = data['result'][i]['file_count']
          
        }

      }
    });
    
  }

  bodyclick(){
    this.isOpened=false;
  }

  ngOnInit() {
 
    this.ebooks = [] ;
    this.loadedebooks=[]
    this.activatedRoute.queryParams.subscribe((res)=>{

      this.dep = res['dept'];
      this.type =res['filetype'];
      console.log(this.type,this.dep);
       let body = {

      filename: this.filename,
      dselected:  this.dep,
      type:'E-books',
      aksi: 'fetch'
    };

    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
      //console.log(data.result['file_title']);

      if(data['success']==true){
        for(let book of data['result']){
          book['file_size'] = Math.trunc(book['file_size'] / 1000)
          this.ebooks.push(book);
          console.log(this.ebooks)
          this.loadedebooks.push(book);
        
        }
        console.log('my data result..... '+ this.ebooks)
      }
        else{
          this.nodata=true
        }
      
     
     
    });
   })

   
  }
  

}
