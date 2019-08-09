import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

    transform(e: any, args?: any): any {
        return e ? e.charAt(0).toUpperCase() + e.substring(1) : '';

    }

}
