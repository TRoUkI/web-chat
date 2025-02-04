import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WebChatComponent} from './web-chat/web-chat.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WebChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
