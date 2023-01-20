import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private router: Router, 
    private http: HttpClient) { }

  ngOnInit(): void {
    sessionStorage.setItem('token', '');
  }

  login() {
    let url = environment.apiUrl + "/login";    
    this.http.post<Observable<boolean>>(url, {
        userName: this.model.username,
        password: this.model.password
    }).subscribe(isValid => {
        if (isValid) {
            sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
            this.router.navigate(['']);
        } else {
            alert("Authentication failed.")
        }
    });
  }

}
