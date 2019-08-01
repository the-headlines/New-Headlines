import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'countPostScore'
})
export class CountPostScorePipe implements PipeTransform {

    transform(post: any): any {
        if (post) {

            return 2 * post.questions + post.comments + post.views + post.totalVotes;
        }
    }

}
