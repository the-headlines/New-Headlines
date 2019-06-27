import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'formattedDate'
})
export class GetPostDateFormattedPipe implements PipeTransform {

    transform(createdDate, onlyDate = true): any {
        if (!onlyDate) {

            const a = moment(); // date now
            const b = moment(createdDate); // post created date

            const minutes = a.diff(b, 'minutes');
            const hours = a.diff(b, 'hours');
            const days = a.diff(b, 'days');
            const weeks = a.diff(b, 'weeks');
            const months = a.diff(b, 'months');
            const years = a.diff(b, 'years');

            if (hours === 0) {
                return `${minutes} minutes ago`;
            } else {
                if (days === 0) {
                    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
                } else {
                    if (weeks === 0) {
                        return `${days} ${days > 1 ? 'days' : 'day'} ago`;
                    } else if (months === 0) {
                        return `${weeks} ${weeks > 1 ? 'weeks' : 'week'} ago`;
                    } else if (years === 0) {
                        return `${months} ${months > 1 ? 'months' : 'month'} ago`;
                    }
                }
            }
        } else {
            return moment(createdDate).format('MMMM Do YYYY, h:mm:ss a');
        }
    }

}
