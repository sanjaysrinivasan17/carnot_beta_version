import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  TemplateRef,
  OnInit
} from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'ftp-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsComponent implements AfterViewInit, OnDestroy, OnInit {

  uploadType: string;
  expanded: any;
  Upstatus:boolean;
  upstate:any;
  panelOpenState:boolean;
 
  mul: number = 100;
  @ViewChild('flow', { static: false })
  flow: FlowDirective;
  get_num: number;
  total_no_files: string[] = [];
  show_num: number;
  flag: number;
  postData: any;
  constructor(private cd: ChangeDetectorRef, private http: HttpClient,private dialog: MatDialog ) { }
  autoUploadSubscription: Subscription;
  autoupload = false;

  ngOnInit()
  {
   
  }


  ngAfterViewInit() {
   
    this.autoUploadSubscription = this.flow.events$.subscribe(event => {
      // to get rid of incorrect `event.type` type you need Typescript 2.8+
      this.get_num = this.flow.flowJs.files.length;
      // console.log(this.get_num);
      // console.log(event.type);
      this.upstate = event.type;
      if (this.autoupload && event.type === 'filesSubmitted') {
        this.flow.upload();
      }
      if (event.type === "fileSuccess") {
        try {
          var temp1 = event;
          // console.log(temp1["event"][0]["file"]["name"]);
          this.total_no_files.push(temp1["event"][0]["file"]["name"]);
          this.show_num = this.total_no_files.length;
          this.flag = 1;
        }
        catch (err) { }
      }
      if (this.show_num === this.get_num && event.type === "complete" && this.flag === 1) {
        // console.log(this.show_num, this.get_num)
        this.postData = {
          'project': "ADMIN",
          'total': this.show_num,
          'allfiles': this.total_no_files
        };
        this.http.post('http://takvaviya.in:8001/project_workflow/ftp/store/Testing%20Image', this.postData).toPromise().then(data => {
          // console.log("have to check success", data);
          // alert("ftp success");
          this.openDialogWithoutRef();
          this.flow.cancel();
          
        });
        
      }
      
      if (event.type === "fileRemoved") {
        this.total_no_files = [];
        this.show_num = this.total_no_files.length;
        this.flag = 0;
      }
    // console.log("hihi", );
    
    });
  }
  ngOnDestroy() {
    this.autoUploadSubscription.unsubscribe();
  }
  trackTransfer(transfer: Transfer) {
    return transfer.id;
  }

 

  //Dialog
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  // @ViewChild('Dialog', { static: true }) Dialog: TemplateRef<any>;

  openDialogWithoutRef() {
    this.dialog.open(this.secondDialog, {width: '20%'});
  }
 
  // openDialogWithoutRef1() {
  //   this.dialog.open(this.Dialog, {width: '20%'});
  // }

  onclickUp()
  {
    this.Upstatus= false;
    // console.log(this.Upstatus);
  }

  onclickPause()
  {
    this.Upstatus= true;
    // console.log(this.Upstatus);
  }
  
  
  
 
}
