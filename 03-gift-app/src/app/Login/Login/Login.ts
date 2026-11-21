import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environmens/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './Login.html',
  styleUrl: './login.css'
})
export default class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  // Cambia la URL por el puerto de tu API .NET
  // private apiUrl = environment.environmentDev;
  // Opción A: Concatenarlo directamente en el componente
  private apiUrl = `${environment.environmentDev}/login`;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Definimos el formulario reactivo
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  
  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    // Enviamos el objeto con login y contrasena a .NET

    this.http.post<any>(this.apiUrl, this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.retc === 0) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.mensaje;
        }
      },
      error: (err) => {
        this.isLoading = false;
        // Capturar el mensaje devuelto por .NET o un error genérico
        this.errorMessage = err.error?.mensaje || 'Error al conectar con el servidor.';
      }
    });
  }
}