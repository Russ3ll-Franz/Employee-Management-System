import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    // styles: [`
    // .container{
    //     border-left: 2px solid #867c7c;
    //     border-right: 2px solid #867c7c;
    //     background-color:  #f1ede9;"
    // }
    // `]
})

export class AppComponent {

    constructor() {
        $.fn.extend({
            animateCss: function (animationName: any, callback: any) {
                let animationEnd = (function (el) {
                    let animations = {
                        animation: 'animationend',
                        OAnimation: 'oAnimationEnd',
                        MozAnimation: 'mozAnimationEnd',
                        WebkitAnimation: 'webkitAnimationEnd',
                    };

                    for (let t in animations) {
                        if (el.style[t] !== undefined) {
                            return animations[t];
                        }
                    }
                })(document.createElement('div'));

                this.addClass('animated ' + animationName).one(animationEnd, function () {
                    $(this).removeClass('animated ' + animationName);

                    if (typeof callback === 'function') callback();
                });

                return this;
            },
        });
    }
}
