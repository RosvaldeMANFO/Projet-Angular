import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ChartConfiguration } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { Period, Task } from "src/app/model/task.model";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-comment-stats",
  templateUrl: "./comment-stats.component.html",
  styles: [],
})
export class CommentStatsComponent implements OnChanges {
  @Input() period!: Period;
  @Input() commentData: Task[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  commentChartData: ChartConfiguration["data"] = {
    labels: [],
    datasets: [
      {
        indexAxis: "y",
        data: [],
        label: "",
        backgroundColor: "#288EDDFF",
        borderColor: "#D26F19FF",
        borderWidth: 1,
      },
    ],
  };

  commentChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 4,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  constructor(public readonly languageService: LanguageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["commentData"] || changes["period"]) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    if (!this.commentData || this.commentData.length === 0) {
      this.resetChart();
      return;
    }

    this.commentChartData = {
      labels: this.commentData.map((item) => item.title),
      datasets: [
        {
          ...this.commentChartData.datasets[0],
          data: this.commentData.map((item) => item.comments.length),
          label: this.labelFromPeriod(),
        },
      ],
    };
    
    if (this.chart) {
      this.chart.update();
    }
  }

  private resetChart(): void {
    this.commentChartData = {
      ...this.commentChartData,
      labels: [],
      datasets: [
        {
          ...this.commentChartData.datasets[0],
          data: [],
          label: this.languageService.translate("dashboard.noData"),
        },
      ],
    };
  }

  private labelFromPeriod(): string {
    return this.period?.startDate && this.period?.endDate
      ? `${this.period.startDate.toLocaleDateString()} - ${this.period.endDate.toLocaleDateString()}`
      : this.languageService.translate("dashboard.noPeriod");
  }
}