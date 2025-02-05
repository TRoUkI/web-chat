import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, NgClass, NgForOf} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {WebSocketService} from '../service/web-socket.service';
import {Message, userIdStr} from '../type/types';
import {Router} from '@angular/router';
import {UsernamePipe} from '../pipe/username.pipe';
import {catchError, forkJoin, merge} from 'rxjs';

@Component({
    selector: 'app-web-chat',
    imports: [
        ReactiveFormsModule,
        NgClass,
        MatDivider,
        MatIcon,
        NgForOf,
        DatePipe,
        FormsModule,
        UsernamePipe
    ],
    templateUrl: './web-chat.component.html',
    styleUrl: './web-chat.component.css'
})
export class WebChatComponent implements OnInit {
    localStorage = localStorage;
    userIdStr = userIdStr;
    Number = Number;

    @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;

    messages: Message[] = [];
    message: Message = {
        content: ''
    };

    allUsers: any[] = [];

    constructor(
        private webSocketService: WebSocketService,
        private router: Router
    ) {
    }

    ngOnInit() {
        forkJoin({
            history: this.webSocketService.getHistory(),
            users: this.webSocketService.getUsers()
        }).pipe(
            catchError(error => {
                this.router.navigate(['/auth/']);
                throw error;
            })
        ).subscribe(({ history, users }) => {
            this.messages = history;
            this.allUsers = users;
        });

        merge(this.webSocketService.getMessages(), this.webSocketService.getSystemMessages())
            .subscribe((msg) => this.messages.push(msg));

        this.scrollToBottom();
    }

    sendMessage() {
        if (this.message.content.trim()) {
            this.message.userId = Number(localStorage.getItem(userIdStr));
            this.message.timestamp = new Date();
            this.webSocketService.sendMessage(this.message);
            this.message.content = '';
            this.scrollToBottom();
        }
    }

    scrollToBottom(): void {
        if (this.myScrollContainer?.nativeElement?.scrollTop)
            try {
                this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
            } catch (err) {
            }
    }

    ngOnDestroy() {
        this.webSocketService.disconnect();
    }
}
