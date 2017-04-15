import {
    trigger,
    state,
    style,
    transition,
    animate,
    AnimationEntryMetadata
} from '@angular/core';

/*export const slideInAnimation: AnimationEntryMetadata =
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        transition('void => *', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            animate('500ms .5s ease-in')
        ]),
        transition('* => void', [
            animate('500ms ease-out', style({
                opacity: 0,
                transform: 'translateX(100%)'
            }))
        ])
    ]);*/
export const AppearAnimation: AnimationEntryMetadata =
    trigger('appear', [
        transition('inactive => active', [
            style({
                opacity: 0
            }),
            animate('1s ease-in', style({
                opacity: 1
            }))
        ])
    ]);
