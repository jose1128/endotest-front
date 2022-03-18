import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/request/user.request.interface';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public loginService: LoginService,
    private formBuilder: FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.buildFormLogin();
  }

  login() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Alguno de los campos se encuentra vacio',
      })
      return;
    }
    
    const userData: User ={
      email: this.loginForm.value.userName,
      password: this.loginForm.value.passwd
    };
    console.log(userData)
    this.loginService.login(userData).subscribe({
      next: (response: any) =>{
        if(response.status === "OK"){
          this.router.navigate(['home']);
        }else{
          alert("Error en el login")
        }
      },
      error: (e) => console.log(e)
    });
  }

  private buildFormLogin() {
    this.loginForm = this.formBuilder.group({
      "userName": [, Validators.required],
      "passwd": [, Validators.required]
    });
  }

}
