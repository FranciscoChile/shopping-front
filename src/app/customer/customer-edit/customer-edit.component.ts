import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  profileImage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: CustomerService
  ) {}

  customerForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: [''],
    address: ['', [Validators.required]],
    profileImg: ['']
  })

  ngOnInit(): void {
    this.get(this.route.snapshot.params['id']);
  }

  save(form : FormGroup) {

    const customerData = {
      id: form.value.id,
      name: form.value.name,
      phone: form.value.phone,
      address: form.value.address,
      email: form.value.email,
      profileImg: form.value.profileImg,
      city: '',
      country: '',
      active: true
    }

    var formData: any = new FormData();
    formData.append("customer", JSON.stringify(customerData));

    if (this.currentFile) formData.append("image",this.currentFile);

      this.api.save(formData).subscribe({
        next: (data) => {
          this.router.navigate(['customer/list']);
        },
        error: (e) => {
          throw new Error('Error cargando información');
        }
      });
  }

  get(id : string) {
    this.api.findById(id).subscribe({
      next: (data) => {
        
        this.profileImage = data.profileImg;
        if (!this.profileImage) {
          this.profileImage = "../../assets/profile-fake.png";
        }

        this.customerForm.setValue({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          profileImg: data.profileImg
        });

      },
      error: (e) => {
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
