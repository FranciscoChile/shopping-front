import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  @ViewChild('content', { static: false }) private content: any;
  
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  profileImage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: CustomerService,
    private modalService: NgbModal
  ) {}

  mainform = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: [''],
    address: ['', [Validators.required]]
  })

  ngOnInit(): void {    
  }

  save(form : FormGroup) {

    var customerData = {
      name: form.value.name,
      phone: form.value.phone,
      address: form.value.address,
      email: form.value.email,
      city: '',
      country: '',
      active: true
    }

    var formData: any = new FormData();
    formData.append("customer", JSON.stringify(customerData));

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
    this.router.navigate(['/customer/list']);
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
