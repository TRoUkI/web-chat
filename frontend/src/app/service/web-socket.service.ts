/*
import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('w://localhost:8080');
  }

  // Send a message to the server
  sendMessage(message: any) {
    this.socket$.next(message);
  }

  // Receive messages from the server
  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  // Close the WebSocket connection
  closeConnection() {
    this.socket$.complete();
  }
}
*/

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import {Client} from '@stomp/stompjs';
import {Message} from '../type/types';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client | null = null;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.connect();
  }
  // Connect to the WebSocket endpoint
  private connect() {
    const socket = new WebSocket('http://localhost:8080/ws'); // Spring WebSocket endpoint
    this.stompClient = new Client();

    this.stompClient.configure({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        console.log('onConnect');

        this.stompClient?.subscribe('/topic/messages', (message) => {
          this.messageSubject.next(JSON.parse(message.body));
        });
      },
      // Helps during debugging, remove in production
      debug: (str) => {
        console.log(new Date(), str);
      }
    });

    this.stompClient.activate();



    //
    // const socket = new WebSocket('http://localhost:8080/ws'); // Spring WebSocket endpoint
    // this.stompClient = Stomp.over(socket);
    //
    // this.stompClient.connect({}, () => {
    //   console.log('Connected to WebSocket');
    //
    //   this.stompClient?.subscribe('/messages', (message) => {
    //     this.messageSubject.next(JSON.parse(message.body));
    //   });
    // });
  }

  sendMessage(message: Message) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({destination: '/app/sendMessage',body: JSON.stringify(message)});
    } else {
      console.error('WebSocket connection is not established.');
    }
  }

  // Receive messages as an Observable
  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  // Disconnect the WebSocket connection
  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate().then(() => {
        console.log('Disconnected from WebSocket');
      });
    }
  }
}
