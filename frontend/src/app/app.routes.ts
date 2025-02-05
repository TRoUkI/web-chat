import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {WebChatComponent} from './web-chat/web-chat.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
    {path: 'auth', component: AuthComponent},
    {path: 'chat', component: WebChatComponent},
    {path: '**', redirectTo: 'auth'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
