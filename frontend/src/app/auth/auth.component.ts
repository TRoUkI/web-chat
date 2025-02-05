import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {WebChatService} from '../service/web-chat.service';
import {AuthUserDTO, jwtStr, userIdStr, userNameStr} from '../type/types';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    imports: [
        ReactiveFormsModule
    ],
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    form: FormGroup;
    loading = false;
    errorMessage: string = '';

    constructor(private fb: FormBuilder, private webChatService: WebChatService, private router: Router) {
        this.form = this.fb.group({
            username: [''],
            password: ['']
        });
    }

    login() {
        this.loading = true;
        const user: AuthUserDTO = this.form.value;

        this.webChatService.authenticate(user).subscribe({
            next: (res) => {
                localStorage.setItem(jwtStr, res.token);
                localStorage.setItem(userIdStr, res.id);
                localStorage.setItem(userNameStr, user.username);

                this.router.navigate(['/chat']);
            },
            error: (err) => {
                this.errorMessage = 'Invalid login';
                this.loading = false;
            }
        });
    }

    register() {
        this.loading = true;
        const user: AuthUserDTO = this.form.value;

        this.webChatService.register(user).subscribe({
            next: () => {
                alert('Registration successful! Please log in.');
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Registration failed';
                this.loading = false;
            }
        });
    }
}
