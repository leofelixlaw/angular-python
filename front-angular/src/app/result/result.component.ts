import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud/crud.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  items = [];
  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.crudService.getItems().subscribe(result => {
      this.items = result;
    });
  }
  ngbDate(value){
    value = JSON.parse(value);
    return new Date(value.year, value.month - 1, value.day);
  }
}
