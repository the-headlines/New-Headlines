import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchNews'
})
export class SearchNewsPipe implements PipeTransform {

    transform(posts: any, value: any): any {
        if (!value) {
            return posts;
        }
        return posts.filter(p => p.extractedTitle.toLowerCase().includes(value));
    }
}
