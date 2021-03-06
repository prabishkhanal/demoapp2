import { Component, OnInit ,ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Department } from 'src/app/models/department-models';
import { DepartmentService } from 'src/app/services/department.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddDepComponent } from 'src/app/department/add-dep/add-dep.component';


@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor( private service: DepartmentService,
    private dialog:MatDialog) { }

  
  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['Options', 'DepartmentID', 'DepartmentName']

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.refreshDepList();
  }


  refreshDepList(){
    //var dummyData = [{DepartmentID:1, DepartmentName: "IT"},
    //{DepartmentID:2, DepartmentName: "Account"}, {DepartmentID:3, DepartmentName: "Finance"}]


    // this.listData = new MatTableDataSource(dummyData);

    this.service.getDepList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

  applyFilter(filtervalue: string){
    this.listData.filter= filtervalue.trim().toLocaleLowerCase();
  }


  onEdit( dep: Department){
    console.log(dep)
  }

  onDelete( id: number){
    
    console.log(id);
    
  }
  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddDepComponent, dialogConfig);

  }
}
