import {
    Directive,
    HostListener,
    HostBinding,
    ElementRef
} from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    constructor(private elRef: ElementRef) {}

    @HostBinding('class.open') open = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.open = this.elRef.nativeElement.contains(event.target)
            ? !this.open // inside of the element
            : false; // outside of the element
    }
}
