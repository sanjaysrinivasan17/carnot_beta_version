import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {

  dateOfBirth = new FormControl(); 
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  studentForm = this.formBuilder.group({
    name: '',
    dateOfBirth: '',
    admissionDate: ''
  });
  // onFormSubmit() {
  //   this.studentService.saveStudent(this.studentForm.value);
  //   this.studentForm.reset();
  // }
  
}
