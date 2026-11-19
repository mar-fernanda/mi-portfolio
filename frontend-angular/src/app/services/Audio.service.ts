import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private ambience: HTMLAudioElement | null = null;
  private launch: HTMLAudioElement | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    if (isPlatformBrowser(platformId)) {
      this.ambience = new Audio('/Interstellar.mp3');
      this.ambience.loop = true;
      this.ambience.volume = 0.55;

      this.launch = new Audio('/rocket-launch.mp3');
      this.launch.volume = 0.35;
    }
  }

async startAmbience(): Promise<boolean> {
  if (!this.ambience) return false;

  try {
    await this.ambience.play();
    return true;
  } catch {
    // El navegador puede bloquear el inicio automático.
    return false;
  }
}
async toggleAmbience(): Promise<void> {
  if (!this.ambience) return;

  if (this.ambience.paused) {
    await this.ambience.play();
  } else {
    this.ambience.pause();
  }
}


  async playLaunch(): Promise<void> {
    if (!this.launch) return;

    this.launch.currentTime = 0;
    await this.launch.play();
  }
}

