import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product/shared/product';
import { ProductService } from 'src/app/product/shared/product.service';

@Component({
  selector: 'app-selling-list',
  templateUrl: './selling-list.component.html',
  styleUrls: ['./selling-list.component.css']
})
export class SellingListComponent implements OnInit {

  products: Product[]  = [];
  
  constructor(
    private api: ProductService
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
}
