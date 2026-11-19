import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from './services/ApiService';
import { AudioService } from './services/Audio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  profile: any = null;
  messages: any[] = [];
  userMessage = '';
  musicPlaying = false;
  chatOpen = false;
  sessionId = '';

  constructor(
    private api: ApiService,
    public audio: AudioService,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
  void this.audio.startAmbience().then((started) => {
    this.musicPlaying = started;
    this.cdr.markForCheck();
  });

  this.sessionId = 'session_' + Math.random().toString(36).substring(2, 11);

  this.api.getProfile().subscribe({
    next: (data) => {
      this.profile = data;
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.error('ERROR PERFIL:', err);
      this.cdr.markForCheck();
    }
  });
}
sendMessage(): void {
  const message = this.userMessage.trim();
  if (!message) return;

  this.messages.push({ sender: 'user', text: message });
  this.messages.push({ sender: 'bot', text: 'Escribiendo…', loading: true });
  this.userMessage = '';

  this.api.sendChatMessage(message, this.sessionId).subscribe({
    next: (data) => {
      this.messages = this.messages.filter((item) => !item.loading);

      const reply =
        data?.content?.parts?.[0]?.text ??
        data?.output ??
        data?.reply ??
        data?.response ??
        data?.text ??
        'Lo siento, este gatito espacial no pude procesar la respuesta. Intenta de nuevo 😿';

      this.messages.push({ sender: 'bot', text: reply });
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.error('Error en el chat:', err);
      this.messages = this.messages.filter((item) => !item.loading);
      this.messages.push({
        sender: 'bot',
        text: 'Tadeo está descansando, intenta de nuevo en unos segundos 😼'
      });
      this.cdr.markForCheck();
    }
  });
}

async toggleMusic(): Promise<void> {
  try {
    await this.audio.toggleAmbience();
    this.musicPlaying = !this.musicPlaying;
    this.cdr.markForCheck();
  } catch (err) {
    console.error('No se pudo reproducir la música:', err);
  }
}
}