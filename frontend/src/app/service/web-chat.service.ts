import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthUserDTO, Message} from '../type/types';

@Injectable({
  providedIn: 'root'
})
export class WebChatService {
  constructor(private http: HttpClient) { }

  authenticate(userDTO: AuthUserDTO) {
      return this.http.get<any>("/auth/login");
  }
}
