import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {WebChatService} from '../service/web-chat.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private webChatService: WebChatService, private router: Router) {
    }

    canActivate(): boolean {
        if (!this.webChatService.isAuthenticated()) {
            this.router.navigate(['/auth']);
            return false;
        }
        return true;
    }
}
