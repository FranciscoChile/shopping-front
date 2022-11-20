import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  @ViewChild('content', { static: false }) private content: any;
  @ViewChild('imageInput') imageInput: any;
  
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  profileImage = '';

  constructor(    
    private fb: FormBuilder,
    private router: Router,
    private api: ProductService,
    private modalService: NgbModal
    ) { }

  mainform = this.fb.group({
    name: ['', [Validators.required]],
    sku: ['', [Validators.required]],
    priceList: ['', [Validators.required]],
    priceSell: ['', [Validators.required]]
  })

  ngOnInit(): void {
  }

  save(form : FormGroup) {

    var mainform = {
      name: form.value.name,
      sku: form.value.sku,
      priceList: form.value.priceList,
      priceSell: form.value.priceSell
    }

    var formData: any = new FormData();
    formData.append("product", JSON.stringify(mainform));

    if (this.currentFile) formData.append("image",this.currentFile);
    
    this.api.save(formData).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {

          formData = new FormData();
          this.mainform.reset();
          
          this.selectedFiles = undefined;
          this.currentFile = undefined;
          this.profileImage = '';
          this.imageInput.nativeElement.value = '';

          this.modalService.open(this.content);
        }
      },
      error: (e) => {
        this.progress = 0;
        throw new Error('Error cargando información');
      }
    });

  }
  
  cancel() {
    this.router.navigate(['/product/list']);
  }
  
  selectFile(event: any): void {

    const files = event.target.files;
    this.selectedFiles = files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {      
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.profileImage = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }    
  }
}
