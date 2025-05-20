import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
                // elRef--> element reference of the dropdown (html element/appDropdown)  
                // renderer--> to add or remove classes (Angular’s recommended way to modify the DOM to avoid XSS vulnerabilities)
  }
  @HostListener('click') toggleOpenEvent() { // Listens for a click on the dropdown.
    this.isOpen = !this.isOpen; // Toggle the isOpen property
    const dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu'); // Get the dropdown menu
    if (dropdownMenu) {
      if (this.isOpen) {
        this.renderer.addClass(dropdownMenu, 'show');

      } else {
        this.renderer.removeClass(dropdownMenu, 'show');
      }
    }
  }

  // @HostListener('document:click', ['$event']) closeDropdown(event: Event) {  // Listens for any click on the entire document.
  //   if (!this.elRef.nativeElement.contains(event.target)) {
  //     this.isOpen = false;
  //     const dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu');
  //     if (dropdownMenu) {
  //       this.renderer.removeClass(dropdownMenu, 'show');
  //     }
  //   }
  // }
}
