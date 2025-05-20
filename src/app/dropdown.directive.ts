import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    const dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu');
    if (dropdownMenu) {
      if (this.isOpen) {
        this.renderer.addClass(dropdownMenu, 'show');

      } else {
        this.renderer.removeClass(dropdownMenu, 'show');
      }
    }
  }

  @HostListener('document:click', ['$event']) closeDropdown(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      const dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu');
      if (dropdownMenu) {
        this.renderer.removeClass(dropdownMenu, 'show');
      }
    }
  }
}
