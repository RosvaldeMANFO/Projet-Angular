import { Component } from "@angular/core";
import { ChartConfiguration, LegendElement } from "chart.js";
import Config from "chart.js/dist/core/core.config";

@Component({
  selector: "app-comment-stats",
  templateUrl: "./comment-stats.component.html",
  styles: [],
})
export class CommentStatsComponent {


  public barChartData: ChartConfiguration["data"] = {
    datasets: [
      {
        indexAxis: "y",
        data: [65, 59, 80, 81, 56, 55, 40],
        label: "Du 02/12/2024 au 08/12/2024",
        backgroundColor: "#D26F197B",
        borderColor: "#D26F19FF",
        borderWidth: 1,
      },
    ],
    labels: [
      "Je vais manger",
      "Je vais dormir",
      "Je vais travailler",
      "Je vais étudier",
      "Je vais lire",
    ],
  };

  public barChartOptions: ChartConfiguration = {
    type: "bar",
    data: this.barChartData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 4,
    },
  };

   // Event Handlers
   public chartClicked(event: any): void {
    console.log('Chart Clicked:', event);
  }

  public chartHovered(event: any): void {
    console.log('Chart Hovered:', event);
  }
}
