import { Component, OnInit } from '@angular/core';

@Component({
    template: ''
})
export class GoToHomeComponent implements OnInit {
    ngOnInit() {
        const origin = window.location.origin;
        window.location.href = origin;
    }
}
