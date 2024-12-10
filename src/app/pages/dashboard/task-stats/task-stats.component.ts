import {
  Component,
  ViewChild,
  OnChanges,
  SimpleChanges,
  Input,
} from "@angular/core";
import { BaseChartDirective } from "ng2-charts";
import { Period, TasksByKey } from "src/app/model/task.model";
import { ChartConfiguration } from "chart.js";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-task-stats",
  templateUrl: "./task-stats.component.html",
  styles: [],
})
export class TaskStatsComponent implements OnChanges {
  @Input() period!: Period;
  @Input() tasksByStatus: TasksByKey = {};
  @Input() tasksByCategory: TasksByKey = {};
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(public readonly languageService: LanguageService) {}

  statusChartData: ChartConfiguration["data"] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  statusChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    aspectRatio: 1.7,
    plugins: {
      legend: {
        display: true,
        position: "top",
        title: {
          display: true,
          text: `${this.languageService.translate('dashboard.byStatus')} ${this.labelFromPeriod()}`,
          font: {
            size: 17,
            weight: "bold",
            style: "oblique",
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
      },
    },
  };

  categoryChartData: ChartConfiguration["data"] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: "",
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };

  categoryChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: true,
        position: "top",
        title: {
          display: true,
          text: this.languageService.translate('dashboard.byCategories'),
          font: {
            size: 17,
            // weight: "bold",
            style: "oblique",
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes["tasksByStatus"] ||
      changes["tasksByCategory"] ||
      changes["period"]
    ) {
      this.updateCharts();
    }
  }

  private updateCharts(): void {
    this.updateStatusChart();
    this.updateCategoryChart();

    if (this.chart) {
      this.chart.update();
    }
  }

  private updateStatusChart(): void {
    const statusData = this.tasksByStatus;

    this.statusChartData = {
      ...this.statusChartData,
      labels: Object.keys(statusData),
      datasets: [
        {
          ...this.statusChartData.datasets[0],
          data: Object.values(statusData).map((status) => status.count),
          backgroundColor: Object.values(statusData).map(
            (status) => status.color
          ),
        },
      ],
    };
    this.statusChartOptions &&
      this.statusChartOptions.plugins &&
      this.statusChartOptions.plugins.legend &&
      this.statusChartOptions.plugins.legend.title &&
      (this.statusChartOptions.plugins.legend.title.text =  this.labelFromPeriod() ?`${this.languageService.translate('dashboard.byStatusFrom')} ${this.labelFromPeriod()}` : this.languageService.translate('dashboard.byStatus'));
  }

  private updateCategoryChart(): void {
    const categoryData = this.tasksByCategory;

    this.categoryChartData = {
      ...this.categoryChartData,
      labels: Object.keys(categoryData),
      datasets: [
        {
          ...this.categoryChartData.datasets[0],
          data: Object.values(categoryData).map((category) => category.count),
          backgroundColor: Object.values(categoryData).map(
            (category) => category.color
          ),
          label: this.labelFromPeriod(),
          borderColor: Object.values(categoryData).map(
            (category) => category.color.slice(0, -2) + "1"
          ),
        },
      ],
    };
  }

  private labelFromPeriod(): string {
    return this.period?.startDate && this.period?.endDate
      ? `${this.period.startDate.toLocaleDateString()} ${this.languageService.translate('dashboard.toStatus')} ${this.period.endDate.toLocaleDateString()}`
      : this.languageService.translate('dashboard.noPeriod');
  }
}
