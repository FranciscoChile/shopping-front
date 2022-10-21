import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from '../shared/product.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[]  = [];

  page: number = 1;
  count: number = 0;
  tableSize: number = 12;
  gridColumns = 5;
  search!: string;

  idModal = '';

  constructor(
    private api: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.findProducts();
  }


  findProducts() {

    this.api.findAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (e) => {
        throw new Error('Error cargando información');
      }
    });
    
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.findProducts();
  }

  open(content:any, id: string) {
    this.idModal = id;
    this.modalService.open(content).result.then((result) => {
      if (result == 'delete') this.delete();
    });
  } 

  delete () {
    const id = this.idModal;

    this.api.delete(id).subscribe({
      next: (data) => {
        this.findProducts();
      },
      error: (e) => {
        throw new Error('Error cargando información');
      }
    });

  }

}
