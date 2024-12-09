import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) return ''; 
    return value
      .split(' ') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '); 
  }
}
