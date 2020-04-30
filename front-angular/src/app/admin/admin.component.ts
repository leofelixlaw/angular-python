import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../shared/crud/crud.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
import { HotelPackage } from '../shared/crud/hotelpackge';
import { Common } from '../shared/common';
import { Router } from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  public items = [];
  date: NgbDateStruct;
  minDate: NgbDateStruct;
  reorderable: boolean = true;
  loadingIndicator: boolean = true;
  @ViewChild('thisForm') form: NgForm;
  @ViewChild('table') table;
  hotelpackage: any;
  id: any;
  temp: any;
  constructor(
    private crudService: CrudService,
    private toastr: ToastrManager,
    private common: Common,
    private router: Router
  ) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit() {
    this.hotelpackage = new HotelPackage();
    this.onLoadData();
  }

  onLoadData() {
    this.crudService.getItems().subscribe(result => {
      this.items = result;
      this.temp = [...result];
    });
  }

  resetForm() {
    this.form.reset();
    this.id = '';
  }

  // Save item
  onSave() {
    let request;
    this.hotelpackage.valid_duration = this.date;
    let data = this.hotelpackage;
    if (this.id) {
      request = this.crudService.putItem(this.id, data);
    } else {
      request = this.crudService.saveItem(data);
    }

    request.subscribe(
      result => {
        this.toastr.successToastr(
          this.common.ToastInfo.saved,
          this.common.ToastInfo.success
        );
        this.onLoadData();
        this.resetForm();
      },
      (err: HttpErrorResponse) => {
        this.toastr.errorToastr(
          err.error && err.error.message
            ? err.error.message
            : this.common.ToastInfo.wrong,
          this.common.ToastInfo.failure
        );
      }
    );
  }

  onDelete() {
    if (window.confirm(this.common.Confirmation.delete)) {
      this.crudService.deleteItem(this.hotelpackage.id).subscribe(
        result => {
          this.toastr.successToastr(
            this.common.ToastInfo.deleted,
            this.common.ToastInfo.success
          );
          this.onLoadData();
          this.resetForm();
        },
        (err: HttpErrorResponse) => {
          this.toastr.errorToastr(
            err.error && err.error.message
              ? err.error.message
              : this.common.ToastInfo.wrong,
            this.common.ToastInfo.failure
          );
        }
      );
    }
  }

  // Click hotelpackage
  onClick(event) {
    this.hotelpackage = event;
    this.date = JSON.parse(event.valid_duration);
    this.id = event.id;
    console.log(event);
  }

  // Filter items
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.hotelpackage = temp;
    this.table.offset = 0;
  }

  ngbDate(value){
    if(typeof value === 'string'){
      value = JSON.parse(value);
    }
    return new Date(value.year, value.month - 1, value.day);
  }
}
