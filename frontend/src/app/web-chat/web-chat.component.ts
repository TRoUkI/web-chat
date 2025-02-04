import {Component, OnInit} from '@angular/core';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {MatIconButton} from '@angular/material/button';
import {WebSocketService} from '../service/web-socket.service';
import { Message } from '../type/types';
import {WebChatService} from '../service/web-chat.service';

@Component({
  selector: 'app-web-chat',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    MatDivider,
    MatIcon,
    NgForOf,
    MatIconButton,
    DatePipe,
    FormsModule
  ],
  templateUrl: './web-chat.component.html',
  styleUrl: './web-chat.component.css'
})
export class WebChatComponent implements OnInit {
  form!: FormGroup | any;
  loading = false;
  submitted = false;
  authorised = false;

  messages: Message[] = [];
  message: Message = {
    content: ''
  };

  user: any = {};
  allOnlineUsers: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private webSocketService: WebSocketService,
    private webChatService: WebChatService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.webSocketService.getMessages().subscribe((msg) => {
      this.messages.push(msg);
    });
    this.messages.push({
      userId:1,
      content:"Loreum iprium",
      timestamp: new Date(),
    },{
      userId:2,
      content:"Loreum iprium",
      timestamp: new Date(),
    },{
      userId:2,
      content:"Loreum iprium",
      timestamp: new Date(),
    },{
      userId:1,
      content:"Loreum iprium",
      timestamp: new Date(),
    })
  }

  onSubmit() {
    this.webChatService.authenticate({username: this.form.username.value, password: this.form.password.value}).subscribe((e)=>{
      this.authorised = true;
    })
    //
    // // reset alerts on submit
    // this.alertService.clear();
    //
    // // stop here if form is invalid
    // if (this.form.invalid) {
    //   return;
    // }
    //
    // this.loading = true;
    // this.accountService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe({
    //     next: () => {
    //       // get return url from query parameters or default to home page
    //       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //       this.router.navigateByUrl(returnUrl);
    //     },
    //     error: error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     }
    //   });
  }

  sendMessage() {
    if (this.message.content.trim()) {
      this.message.userId = this.user.id;
      this.message.timestamp = new Date();
      this.webSocketService.sendMessage(this.message);
      this.message.content = '';
    }
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }
}
