import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer';
import { CustomerService } from '../shared/customer.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  closeResult: string = '';

  gridColumns = 5;
  customers: Customer[]  = [];
  search!: string;

  page: number = 1;
  count: number = 0;
  tableSize: number = 15;

  filter = {};
  idModal = '';

  linkPicture: any;
  timeStamp: any;

  constructor(
    private api: CustomerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {    
    this.findCustomers();
  }

  findCustomers() {    

    this.api.findAll().subscribe({
      next: (data) => {
        this.customers=[];
        this.customers = data;
      },
      error: (e) => {
        throw new Error('Error cargando información');
      }
    });
    
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.findCustomers();
  }

  delete () {
    const id = this.idModal;

    this.api.delete(id).subscribe({
      next: (data) => {
        this.findCustomers();
      },
      error: (e) => {
        throw new Error('Error cargando información');
      }
    });

  }

  open(content:any, id: string) {
    this.idModal = id;
    this.modalService.open(content).result.then((result) => {
      if (result == 'delete') {
        this.delete();
      }
    });
  } 

}
