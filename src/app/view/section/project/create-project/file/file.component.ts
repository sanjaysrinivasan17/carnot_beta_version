import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @ViewChild("fileInput", { static: false })
  fileInput!: ElementRef;

  public file: any

  constructor() { }

  ngOnInit(): void {
  }
  onFileSelect() { 
    const fileInput = this.fileInput.nativeElement;
    fileInput.onchange = () => {
      for (let index = 0; index < fileInput.files.length; index++) { 
        const file = fileInput.files[index];
        this.file = file;
        // console.log('file', this.file)
      }
    };
    fileInput.click();
  }

}

