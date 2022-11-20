import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

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
    private route: ActivatedRoute,
    private api: ProductService    
  ) { }

  mainform = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    sku: ['', [Validators.required]],
    priceList: [0, [Validators.required]],
    priceSell: [0, [Validators.required]],
    profileImg: ['']
  })
  
  ngOnInit(): void {
    this.get(this.route.snapshot.params['id']);
  }

  get(id : string) {
    this.api.findById(id).subscribe({
      next: (data) => {
        
        this.profileImage = data.profileImg;
        if (!this.profileImage) {
          this.profileImage = "../../assets/profile-fake.png";
        }

        this.mainform.setValue({
          id: data.id,
          name: data.name,
          sku: data.sku,
          priceList: data.priceList,
          priceSell: data.priceSell,
          profileImg: data.profileImg
        });

      },
      error: (e) => {
        throw new Error('Error cargando información');
      }
    });
  }
  
  save(form : FormGroup) {

    var sform = {
      id: form.value.id,
      name: form.value.name,
      sku: form.value.sku,
      priceList: form.value.priceList,
      priceSell: form.value.priceSell
    }

    var formData: any = new FormData();
    formData.append("product", JSON.stringify(sform));

    if (this.currentFile) formData.append("image",this.currentFile);
    
    this.api.save(formData).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.router.navigate(['/product/list']);
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
