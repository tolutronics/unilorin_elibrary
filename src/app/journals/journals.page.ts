import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { PassageService } from '../passage.service';
import { PostProvider } from 'src/providers/post-provider';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-journals',
  templateUrl: './journals.page.html',
  styleUrls: ['./journals.page.scss'],
})
export class JournalsPage implements OnInit {
  loggedin=false
  display:any;
  agrics: any[]=[

   
  
    {
      id:1,
      title:"Agriculture",
    },
  
    {
      id:1,
      title:"Agricultural Extension and Community Development",
    },
  
    {
      id:1,
      title:"Aquaculture and Fisheries",
    },
  
    {
      id:1,
      title:"Home Economics",
    },
  
    {
      id:1,
      title:"Food Science",
    },
  
    {
      id:1,
      title:"Forestry and Wildlife",
    }
    ];
  arts: any[]=[

   
  
    {
      id:1,
      title:"Arabic",
    },
  
    {
      id:1,
      title:"Christian Studies",
    },
  
    {
      id:1,
      title:"Comparative Religious Studies",
    },
  
    {
      id:1,
      title:"English Language",
    },
  
    {
      id:1,
      title:"French Language",
    },
  
    {
      id:1,
      title:"History and International Studies",
    },
  
    {
      id:1,
      title:"Islamic Studies",
    },
  
    {
      id:1,
      title:"Linguistics",
    },
  
    {
      id:1,
      title:"Performing Art",
    },
  
    {
      id:1,
      title:"Yoruba",
    },
    ];

  bmss: any[]=[
  
      {
        id:1,
        title:"Anatomy",
      },
    
      {
        id:1,
        title:"Physiology",
      },
    
      {
        id:1,
        title:"Medicine and Surgery",
      },
    
      {
        id:1,
        title:"Nursing",
      }
      ];

  ciss: any[]=[

   
  
        {
          id:1,
          title:"Computer Science",
        },
      
        {
          id:1,
          title:"Information and Communication Science",
        },
      
        {
          id:1,
          title:"Library and Information Science",
        },
      
        {
          id:1,
          title:"Mass Communication",
        },
      
        {
          id:1,
          title:"Telecommunication Science",
        }
        ];

  edus: any[]=[
  
{title:"Adult Education Studies"},
{title:"Primary Education Studies"},
{title:"Education and Arabic"},
{title:"Education and Christian Religious Studies" },
{title:"Education and Economics"},
{title:"Education and Geography"},
{title:"Education and Social Studies"},
{title:"Education and English"},
{title:"Education and French", },
{title:"Education and History" },
{title:"Education and Islamic Studies"},
{title:"Educational Management"},
{title:"Business Education"},
{title:"Education and Yoruba"},
{title:"Counsellor Education"},
{title:"Agricultural Science Education"},
{title:"Biology Education"},
{title:"Chemistry Education"},
{title:"Mathematics Education"},
{title:"Physics Education"},
{title:"B.Sc. (Ed.) Computer Science"},
{title:"Educational Technology with Arts"},
{title:"Educational Technology withSciences"},
{title:"Educational Technology with Social Sciences"},
{title:"Technology Education"},
          ];

  engs: any[]=[
    {title:"Agricultural and Biosystem Engineering"},
    {title:"Biomedical Engineering"},
    {title:"Chemical Engineering"},
    {title:"Civil Engineering" },
    {title:"Computer Engineering"},
    {title:"Electrical and Electronics Engineering"},
    {title:"Food and Bioprocess Engineering"},
    {title:"Material and Metallurgical Engineering"},
    {title:"Mechanical Engineering", },
    {title:"Water Resources and Environmental Engineering" },
   
            ];
        
  envs: any[]=[
    {title:"Architecture"},
    {title:"Estate Management"},
    {title:"Quantity Surveying"},
    {title:"Surveying and Geoinformatics" },
    {title:"Urban and Regional Planning"},

              ];
        
  laws: any[]=[
        
           
    {title:"Common Law"},
    {title:"Common and Islamic Law"},
                ];
        
  lifes: any[]=[
        
    {title:"Biochemistry"},
    {title:"Microbiology"},
    {title:"Optometry and Vision Science"},
    {title:"Plant Biology" },
    {title:"Zoology"},
                  ];

  mgts: any[]=[

    {title:"Accounting"},
    {title:"Business Administration"},
    {title:"Finance"},
    {title:"Marketing" },
    {title:"Industrial Relation and Personnel Management"},
    {title:"Public Administration" },              
   ];
          
  pharms: any[]=[
    {title:"Pharmacy"},
                      ];
                  
  phys: any[]=[
    
    {title:"Chemistry"},
    {title:"Geology"},
    {title:"Geophysics" },
    {title:"Industrial Chemistry"},
    {title:"Mathematics"},
    {title:"Physics"},
    {title:"Statistics"},
                        ];
                  
  socials: any[]=[
                  
    {title:"Criminology and Security Studies"},
    {title:"Economics"},
    {title:"Geography and Environmental Science" },
    {title:"Political Science"},
    {title:"Psychology"},
    {title:"Social Work"},
    {title:"Sociology"},
                          ];
                  
  vets: any[]=[
                  
    {title:"Veterinary Medicine"},
   
                            ];


    faculties: any[]=[
  
     
    
      {
        id:1,
        title:" Arts",
      },
    
      {
        id:1,
        title:"Basic Medical Sciences",
      },
    
      {
        id:1,
        title:"Business & Social Sciences",
      },
    
      {
        id:1,
        title:"Clinical Sciences",
      },
    
      {
        id:1,
        title:"Communication and Information Sciences",
      },
    
      {
        id:1,
        title:"Education",
      },
    
      {
        id:1,
        title:"Engineering & Technology",
      },
    
      {
        id:1,
        title:"Law",
      },
    
      {
        id:1,
        title:"Life Sciences",
      },
      {
        id:1,
        title:"Physical Sciences",
      },
      ];







      topStories: any[]=[
  
        {
          id:1,
          image:"assets/img/ebook1.jpg",
        },
      
        {
          id:1,
          image:"assets/img/ebook2.jpg",
        },
      
        {
          id:1,
          image:"assets/img/ebook3.jpg",
        },

        {
          id:1,
          image:"assets/img/ebook4.jpg",
        },
      
        
      
       
        ]
panelOpenState = false;
menu = false;
dat = {} as any; 
fac= {} as any;
slideOptsOne = {
  initialSlide: 0,
  slidesPerView: 1,
  autoplay:true,
  speed:400
 };
 status:any;
 isOpened : boolean= false;
 message:any;
 matric:any;
 all = [] as any;
 ebooks = [] as any;
 loadedall = [] as any;
 queryText;
 isSearching: boolean=false;
public devWidth = this.platform.width();
  constructor(private postPvdr:PostProvider,private alertController: AlertController,public router:Router, public platform:Platform, public ps:PassageService) { 

    this.checkUser()


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

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
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

  jbank(i){
var q ={
  dept:i,
  filetype:'E-journals'
}
    this.router.navigate(['/jbank'], {
      queryParams:q,
    });
   // console.log(i);
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


 

  
  menuclick(){
   
      this.menu=true;
    
    
  }

}
