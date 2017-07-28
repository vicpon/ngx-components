import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'progress',
    template: `
    <div class="progress-bar" [ngStyle]="setContainerStyles()" [attr.data-progress]="value">
        <span [ngStyle]="setBarStyles()">&nbsp;</span>
    </div>
  `,
    styles: [`
    .progress-bar {
      background-color: whiteSmoke;
      border-radius: 2px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25) inset;
      
      position: relative;
      display: block;
    }
      
    .progress-bar > span {
      background-color: #0bb71c;
      border-radius: 2px;
      
      display: block;
      text-indent: -9999px;
    }
  `]
})
export class Progress {
    @Input() width: number = 100;
    @Input() height: number = 24;
    @Input() max: number = 100;
    @Input() orientation: ProgressOrientation = ProgressOrientation.HorizontalRight;

    @Input('value')
    get value() {
        return this._value;
    }
    set value(val: number) {
        this._value = Math.min(this.max, Math.max(0, val));
    }

    _value: number;

    setContainerStyles() {
        let styles: any = null;
        if (this.orientation === ProgressOrientation.HorizontalRight ||
            this.orientation === ProgressOrientation.HorizontalLeft) {
            styles = {
                'width': `${this.width}px`,
                'height': `${this.height}px`
            };
        } else {
            styles = {
                'height': `${this.width}px`,
                'width': `${this.height}px`
            };
        }
        return styles;
    }

    setBarStyles() {
        let styles: any = null;
        if (this.orientation === ProgressOrientation.HorizontalRight) {
            styles = {
                'width': `${this.value}%`,
                'height': `${this.height}px`
            };
        } else if (this.orientation === ProgressOrientation.HorizontalLeft) {
            styles = {
                'width': `${this.value}%`,
                'height': `${this.height}px`,
                'position': 'absolute',
                'right': 0
            };
        } else if (this.orientation === ProgressOrientation.VerticalDown) {
            styles = {
                'height': `${this.value}%`,
                'width': `${this.height}px`
            };
        } else if (this.orientation === ProgressOrientation.VerticalUp) {
            styles = {
                'height': `${this.value}%`,
                'width': `${this.height}px`,
                'position': 'absolute',
                'bottom': 0
            };
        }
        return styles;
    }
}

export enum ProgressOrientation {
    HorizontalRight = 0,
    HorizontalLeft = 1,
    VerticalDown = 2,
    VerticalUp = 3
}

@NgModule({
    imports: [CommonModule],
    declarations: [Progress],
    exports: [Progress]
})
export class ProgressModule {
}
