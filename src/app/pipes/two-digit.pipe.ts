import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "twoDigit",
})
export class TwoDigitPipe implements PipeTransform {
  transform(value: number): string {
    if (value !== undefined) {
      return value < 10 ? `0${value}` : `${value}`;
    }
    return "00";
  }
}
