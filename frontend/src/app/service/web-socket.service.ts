import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Client} from '@stomp/stompjs';
import {jwtStr, Message} from '../type/types';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private stompClient: Client | null = null;
    private messageSubject: Subject<any> = new Subject<any>();
    private systemMessageSubject: Subject<any> = new Subject<any>();

    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {
        this.connect();
    }

    connect() {
        this.stompClient = new Client();
        const jwtToken = localStorage.getItem(jwtStr);

        this.stompClient.configure({
            brokerURL: `ws://localhost:8080/ws?jwt=${jwtToken}`,

            onConnect: () => {
                console.log('onConnect');

                this.stompClient?.subscribe('/topic/messages', (message) => {
                    this.messageSubject.next(JSON.parse(message.body));
                });
                this.stompClient?.subscribe('/topic/systemMessage', message => {
                    this.systemMessageSubject.next(JSON.parse(message.body));
                });
            }
        });

        this.stompClient.activate();
    }

    sendMessage(message: Message) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.publish({destination: '/app/sendMessage', body: JSON.stringify(message)});
        } else {
            console.error('WebSocket connection is not established.');
        }
    }

    getMessages(): Observable<any> {
        return this.messageSubject.asObservable();
    }

    getSystemMessages(): Observable<any> {
        return this.systemMessageSubject.asObservable();
    }

    getHistory(): Observable<any> {
        return this.http.get(`${this.apiUrl}/history?jwt=${localStorage.getItem(jwtStr)}`);
    }

    getUsers(): Observable<any> {
        return this.http.get(`${this.apiUrl}/users?jwt=${localStorage.getItem(jwtStr)}`);
    }

    disconnect() {
        if (this.stompClient) {
            this.stompClient.deactivate().then(() => {
                console.log('Disconnected from WebSocket');
            });
        }
    }
}
