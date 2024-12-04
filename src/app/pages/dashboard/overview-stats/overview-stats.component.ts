import { Component, Input } from "@angular/core";

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
}
