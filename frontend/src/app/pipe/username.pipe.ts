import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../type/types';

@Pipe({
    name: 'username'
})
export class UsernamePipe implements PipeTransform {

    transform(userId: any, users: User[]): string {
        if (!users || !userId) {
            return 'System';
        }
        const user = users.find(u => u.userId === userId);
        return user ? user.username : 'System';
    }
}
