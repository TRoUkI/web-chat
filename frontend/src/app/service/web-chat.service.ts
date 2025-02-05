import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthUserDTO, jwtStr} from '../type/types';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class WebChatService {
    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient, private router: Router) {
    }

    authenticate(userDTO: AuthUserDTO) {
        return this.http.post<any>(`${this.apiUrl}/auth/login`, userDTO);
    }

    register(userDTO: AuthUserDTO): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/signup`, userDTO);
    }

    logout() {
        localStorage.removeItem(jwtStr);
        this.router.navigate(['/auth']);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(jwtStr);
    }
}
