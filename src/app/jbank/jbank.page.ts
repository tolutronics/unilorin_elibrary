import { Component, OnInit, Input } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-jbank',
  templateUrl: './jbank.page.html',
  styleUrls: ['./jbank.page.scss'],
})
export class JbankPage implements OnInit {
  ebooks = [] as any;
  loadedebooks = [] as any;
  dept:any;
  queryText;
  @Input() isOpened : boolean= false;
  @Input() loggedin : boolean= false;
  keypath;
  result;
  filename={} as any;
  res={} as any;
  url={} as any;
  lent;
  i=0;
  dep;
  type;
  count;
  status:any;
  display:any;
  matric:any;
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
    console.log(user)
    if(user==null){
      this.loggedin=false
      this.presentAlert('Please Log in', "You can't access this page");
    }else{
      this.loggedin=true
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

 
  download(i){

    console.log('testing'+ i);
   
    let body = {
      filename: i,
      dselected:this.dep,
      aksi: 'count',
    };
    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
      console.log(data['result']);
    });
    
  }
 

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((res)=>{

      this.dep = res['dept'];
      this.type =res['filetype'];
console.log(this.type,this.dep);
       let body = {

      filename: this.filename,
      dselected:this.dep,
      type:'E-journals',
      aksi: 'fetch2'
    };

    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
      //console.log(data.result['file_title']);
      for(let book of data['result']){
        book['file_size'] = Math.trunc(book['file_size'] / 1000)
        this.ebooks.push(book);
        this.loadedebooks.push(book);
      }
      console.log('my data result..... '+ this.ebooks)
    });
    })

   
  }
  receiveMessage($event) {
    this.message = $event
    if (this.message=='open') {
      this.isOpened=true;
    }else{
      this.isOpened=false;
    }
  }
  close(){
    this.isOpened=false;
   }
  bodyclick(){
    this.isOpened=false;
  }
  open(){
    this.isOpened=true;
  }

 
     

}
