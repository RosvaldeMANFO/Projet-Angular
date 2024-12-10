import { Component, Input } from "@angular/core";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-overview-stats",
  templateUrl: "overview-stats.component.html",
  styles: [],
})
export class OverviewStatsComponent {
  @Input() nbrUsers: number = 0;
  @Input() nbrTasks: number = 0;
  @Input() nbrCategories: number = 0;
  @Input() nbrComments: number = 0;

  constructor(public readonly languageService: LanguageService) {}
}
