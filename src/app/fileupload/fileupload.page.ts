import { Component, OnInit } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { PassageService } from '../passage.service';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/post-provider';
import { ToastController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.page.html',
  styleUrls: ['./fileupload.page.scss'],
})
export class FileuploadPage  {
  Fselected:any;
  dselected:any;
  Tselected:any;
  uploadv=false;
  display:any;
  complete:boolean=false;
  fileValue;
  type;
  empty:any='';
  file;
  message="";
  imagePreview;
  selecetdFile;
  url;
  
  depts=[] as any;
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
  
      {title:"Agriculture"},
      {title:"Arts"},
      {title:"Basic Medical Sciences"},
      {title:"Communication and Information Sciences"},
      {title:"Education"},
      {title:"Engineering and Technology"},
      {title:"Environmental Sciences"},
      {title:"Law"},
      {title:"Life Sciences"},
      {title:"Management Sciences"},
      {title:"Pharmaceutical Sciences"},
      {title:"Physical Sciences"},
      {title:"Social Sciences"},
      {title:"Veterinary Medicine"},
      ];


panelOpenState = false;
isHovering: boolean;
show:boolean=false;
uploading:boolean=false;
dat = {} as any; 
fac= {} as any;
postData= {} as any;
filename={} as any;
fileurl:any;
status:any;
matric:any;


files: File[] = [];
constructor(
  private alertController:AlertController,private toastCtrl:ToastController,private postPvdr:PostProvider,private ps: PassageService,public router:Router) {

 
  
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
           for (let i = 0; i < this.files.length; i++) {
    this.files[i]=this.empty;
  }
  this.show=false;

         this.router.navigateByUrl('/');
         this
        }
      },
    ]
  });

  await alert.present();
}

async presentAlert2(msg:string, sub:string) {
  const alert = await this.alertController.create({
    header: 'Alert',
    subHeader: sub,
    message: msg,
    buttons: [
      {
        text: 'OK',
        role: 'ok',
        handler: data => {
        
         
        }
      },
    ]
  });

  await alert.present();
}


upload(){

 
  const url = 'http://localhost/elibrary/server_api/process.php';
   const formData = new FormData()
  for (let i = 0; i < this.files.length; i++) {
    this.file= this.files[i];
   // console.log(file);
    this.filename[i]=this.files[i].name;
   
    formData.append('files[]', this.file);
     formData.append('department', this.dselected)
     formData.append('type',this.Tselected)
    
    
  }

  fetch(url, {
    method: 'POST',
    body: formData
}).then(response => {
  console.log(response)
 // console.log(data)
  if(response['status']==200){
    this.message="";
    this.uploading=false;
    this.complete=true;
    this.message="Uploaded";
     this.presentAlert2('File uploaded successfully', 'SUCCESS!');
  }
})
  // let body ={
  //   //myFile:formData,
  //   department:this.dselected,
  //   type:this.Tselected,
  //   aksi:'upload'
  // }
  // this.postPvdr.postData(body, 'process.php').subscribe(async data =>{
  //   console.log(data)
  // })
  // formData.forEach(data=>{
  //   console.log(data);
  // })
 
}


isActive(snapshot) {
 this.uploadv=false;
}
 

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  FacultyChanged(ev:any){

    this.Fselected= ev.target.value;;
    if(this.Fselected=="Agriculture"){
      this.depts = this.agrics;
    }

    else if(this.Fselected=="Arts"){
      this.depts = this.arts;
    }

    else if(this.Fselected=="Basic Medical Sciences"){
      this.depts = this.bmss;
    }

    else if(this.Fselected=="Communication and Information Sciences"){
      this.depts = this.ciss;
    }

    else if(this.Fselected=="Education"){
      this.depts = this.edus;
    }

    else if(this.Fselected=="Engineering and Technology"){
      this.depts = this.engs;
    }

    else if(this.Fselected=="Environmental Sciences"){
      this.depts = this.envs;
    }

    else if(this.Fselected=="Law"){
      this.depts = this.laws;
    }

    else if(this.Fselected=="Life Sciences"){
      this.depts = this.lifes;
    }

    else if(this.Fselected=="Management Sciences"){
      this.depts = this.mgts;
    }

    else if(this.Fselected=="Pharmaceutical Sciences"){
      this.depts = this.pharms;
    }
    else if(this.Fselected=="Physical Sciences"){
      this.depts = this.phys;
    }
    else if(this.Fselected=="Social Sciences"){
      this.depts = this.socials;
    }
    else if(this.Fselected=="Veterinary Medicine"){
      this.depts = this.vets;
    }
    
  

  }

  TypeChanged(ev:any){

    this.Tselected= ev.target.value;
    console.log(this.Tselected)
  

  }
  
  
 
  DeptChanged(ev:any){
    this.dselected= ev.target.value;
    console.log(this.dselected);
  }

  onDrop(files: FileList){
    this.show=true;
    for (let i = 0; i < files.length; i++) {
          this.files.push(files.item(i));}
          console.log(this.files);

  }

  // onDrop(files: FileList) {
  //   for (let i = 0; i < files.length; i++) {
  //     this.files.push(files.item(i));
      
  //   }

  
//}
}