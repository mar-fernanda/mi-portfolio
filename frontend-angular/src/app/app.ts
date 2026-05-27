import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  profile: any;
  messages: any[] = [];
  userMessage = '';
  chatOpen = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProfile().subscribe({
      next: (data) => {
        console.log('DATOS:', data);
        this.profile = data;
      },
      error: (err) => {
        console.error('ERROR:', err);
      }
    });
  }

sendMessage() {
  if (!this.userMessage.trim()) return;

  this.messages.push({
    sender: 'user',
    text: this.userMessage
  });

  // Mensaje de carga inmediato
  this.messages.push({
    sender: 'bot',
    text: 'Tadeo está consultando las estrellas... 🌌',
    loading: true
  });

  // Petición limpia a n8n
  fetch('http://localhost:5678/webhook/portfolio-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: this.userMessage }) // Solo enviamos el JSON con el mensaje
  })
    .then(res => res.json())
    .then(data => {
      // Quitar mensaje de carga
      this.messages = this.messages.filter(m => !m.loading);

      // Respuesta real que viene desde n8n
      this.messages.push({
        sender: 'bot',
        text: data.reply
      });
    })
    .catch(err => {
      console.error('Error en fetch:', err);
      this.messages = this.messages.filter(m => !m.loading);
      this.messages.push({
        sender: 'bot',
        text: 'Tadeo está descansando, intenta de nuevo en unos segundos 😼'

      });
    });

  this.userMessage = '';
}
}