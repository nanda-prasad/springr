import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import sampleData from './data.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  userData: any = sampleData; registerForm: FormGroup;
  tabDataSource : any = [];
  @ViewChild('callConfigure', { static: true }) callConfigure: TemplateRef<any>;
  submitted: boolean = true;
  displayedColumns: string[] = ['index','profile_img', 'name', 'email', 'selected', 'Action']
  constructor(private dialog : MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.tabledata();
    this.initForm();
  }
  tabledata(){
    let experience : any;
    const oneDay= 24 * 60 * 60 * 1000 
    this.userData.filter(ele=>{
      let doj = new Date(ele.doj).getTime();
      let dol = new Date(ele.dateofleave).getTime();
      experience = Math.ceil((dol - doj)/oneDay);
      let years = Math.floor(experience / 365);
      let months = Math.floor(experience % 365 / 30);
      let days = Math.floor(experience % 365 % 30);

      ele.experience = years + 'years' + months + 'months' + days + 'days';
    });
    this.tabDataSource = new MatTableDataSource(this.userData);
  }
  addUser(){
    let dialogRef = this.dialog.open(this.callConfigure, { disableClose: false });
    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {
        if (res === 'yes') {
          console.log('User clicked yes.');
        } else if (res === 'no') {
          console.log('User clicked no.');
        }
      }
    })
  }
  remove(data){
    let id : any = data.id;
    this.userData.filter(ele=>{
      if (ele.id == id){
        let index = this.userData.indexOf(ele)
        debugger;
        this.userData.splice(index,1);
        this.tabledata();
      } 
    })
  }
  initForm(){
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      name:['',Validators.required],
      doj: ['', Validators.required],
      dateofleave:['', Validators.required],
    })
  }
  get f() { return this.registerForm.controls };
  submitregister(fb){
    this.submitted = true;
    if(this.registerForm.invalid){
      return
    }else{
      this.userData.push(fb);
      this.tabledata();
    }
  }
}
