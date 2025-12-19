import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // corrige styleUrl → styleUrls
})
export class App implements OnInit {

  textoMensaje = '';
  mensajes: any[] = [];

  apiUrl = 'https://backend-actu.onrender.com/api/mensajes';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarMensajes();
  }

  enviarMensaje() {
    if (!this.textoMensaje.trim()) return;

    this.http.post(this.apiUrl, { texto: this.textoMensaje })
      .subscribe(() => {
        this.textoMensaje = '';
        this.cargarMensajes();
      });
  }

  cargarMensajes() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => this.mensajes = data);
  }
}
