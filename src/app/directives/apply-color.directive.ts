import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appApplyColor]'
})
export class ApplyColorDirective implements OnInit {

  @Input() appApplyColor!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'color', this.appApplyColor);
  }
}
