import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'stripTags'
})
export class StripHtmlTagsPipe implements PipeTransform {

    transform(str: string, args?: any): any {
        return str.replace(/<[^>]*>/g, '');
    }

}
