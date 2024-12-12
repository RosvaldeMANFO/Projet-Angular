import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appApplyColor]'
})
export class ApplyColorDirective implements OnInit, OnChanges {

  @Input('appApplyColor') color!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.applyColor();
  }

  ngOnInit() {
    this.applyColor();
  }

  applyColor() {
    this.renderer.setStyle(this.el.nativeElement, 'color', this.color);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.hexToRgba(this.color, 0.2));
    this.renderer.setStyle(this.el.nativeElement, 'border-color', this.color);
    this.renderer.setStyle(this.el.nativeElement, 'border-width', '1px');
  }

  private hexToRgba(hex: string, opacity: number): string {
    let r = 0, g = 0, b = 0;

    if (hex.length == 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }

    else if (hex.length == 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
