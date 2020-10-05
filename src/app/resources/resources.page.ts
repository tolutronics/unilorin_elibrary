import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassageService } from '../passage.service';
import { AlertController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {
  status:any;
  loggedin=false
  isOpened : boolean= false;
   message:any;
  display:any;
  matric:any;

  sides:any[]=[
    {image:"./assets/img/side2.jpg"},
    {image:"./assets/img/side4.jpg"},
    {image:"./assets/img/side6.jpg"},
    {image:"./assets/img/side8.jpg"},
    {image:"./assets/img/side9.jpg"},
    {image:"./assets/img/side1.jpg"},
    {image:"./assets/img/side3.jpg"},
    {image:"./assets/img/side5.jpg"},
    {image:"./assets/img/side7.jpg"},
  ];
  resources: any[]=[
  
    {
      id:1,
      title:"Science Direct Open Access Journals",
      url:"https://www.sciencedirect.com/browse/journals-and-books",
      about:"Built on the widest range of trusted, high-quality, interdisciplinary research, ScienceDirect helps you find answers to your most pressing research questions, stay on top of your field and gain in-depth insights into trending research topics as you take your next steps in discovery.",
      image:"./assets/icons/sciencedirect.png"
    },
  
    {
      id:1,
      title:"Educational Ebooks",
      url:"https://www.pdfdrive.com/",
      about:"PDF Drive is a free search engine which allows you to search, preview and download millions of PDF files into your devices. Our crawlers are constantly scanning the world wide web to add PDF files to our database. In the case that PDF files are withdrawn from the web, then they are also immediately withdrawn from PDF Drive search results.",
      image:"./assets/icons/pdfdrive.png"
    },
  
    {
      id:1,
      title:"Open Source Educative articles",
      url:"http://git.macropus.org/hubmed/",
      about:"HudMed is a smart article search engine that allows one to search for any type of material and returns a arge database of results that suits your search.",
      image:"./assets/icons/humed.png"  
    },
  
    { 
      id:1,
      title:"National Academies of Science, Engineering and Medicine",
      url:"https://www.nap.edu/topic/",
      about:"The National Academies Press (NAP) publishes the reports of the National Academies of Sciences, Engineering, and Medicine. The NAP publishes more than 200 books a year on a wide range of topics in science, engineering, and medicine, providing authoritative, independently-researched information on important matters in science and health policy.",
      image:"./assets/icons/napedu.png"
    },
  
    {
      id:1,
      title:"OMICS International",
      url:"https://www.omicsonline.org/",
      about:"OMICS International is an organization that amalgamates Open Access Publications and International science events for the benefit of the global scientific community. The organization was established in the year 2007 with the sole aim of providing a platform for 'Open Access' to the research information pertaining to diversified fields of Science and technology. ",
      image:"./assets/icons/omics.png"
    },

    {
      id:1,
      title:"Oxford Academy Journals",
      url:"https://academic.oup.com/journals/",
      about:"Oxford University Press prides itself on being both a part of and a partner in the academic community. A department of the University of Oxford, OUP draws on a prestigious research heritage and a deep understanding of the wants and needs of researchers and academics. As a member of the academic community, we understand and can address the needs of our publishing partners in a way that no profit-driven publisher can.",
      image:"./assets/icons/oxford.svg"
    },

    {
      id:1,
      title:"SAGE Journals",
      url:"https://journals.sagepub.com/",
      about:"We are the natural home for leading authors, editors and societies. Publishing more than 1,000 journals, from a wide range of disciplines, SAGE is here to meet your needs.",
      image:"./assets/icons/sage.png"
    },

    {
      id:1,
      title:"Springer Open",
      url:"https://www.springeropen.com/journals",
      about:"In August 2012, due to the growing demand for open access and the success of our SpringerOpen journals, we expanded our offering to open access books. Published under the SpringerOpen brand they complement our established open access journal portfolio. SpringerOpen journals and books are made freely and permanently available online immediately upon publication.",
      image:"./assets/icons/spinger.svg"
    },

    
    {
      id:1,
      title:"Scientific Research Journal List",
      url:"http://www.scirp.org/journal/IndexByTitle.aspx"
    },
  
    
    ];

    all = [] as any;
 ebooks = [] as any;
 loadedall = [] as any;
 queryText;
 isSearching: boolean=false;
  constructor(private postPvdr:PostProvider,private alertController: AlertController,public router:Router,public ps:PassageService) {

 this.checkUser();

   }

   async checkUser(){
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

  ngOnInit() {

    
    let body3 = {
      aksi: 'all'
    };

    this.postPvdr.postData(body3, 'proses-api.php').subscribe(async data =>{
      //console.log(data.result['file_title']);
      for(let book of data['result']){
        this.ebooks.push(book);
        this.loadedall.push(book);
      }
     
    });
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
    
    this.isSearching=false;
   }
  bodyclick(){
    this.isOpened=false;
  }
  open(){
    this.isOpened=true;
  }

  async presentAlert(msg:string, sub:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: sub,
      backdropDismiss:false,
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

  
 

 
}
