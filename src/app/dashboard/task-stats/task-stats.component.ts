import { Component } from "@angular/core";
import { ChartConfiguration } from "chart.js";
import Config from "chart.js/dist/core/core.config";

interface ChartConfig {
  data: ChartConfiguration["data"];
  options: ChartConfiguration["options"];
}

@Component({
  selector: "app-task-stats",
  templateUrl: "./task-stats.component.html",
  styles: [],
})
export class TaskStatsComponent {
  // Common configuration for chart legends
  private createLegendConfig(
    title: string,
    position: "top" | "bottom" = "top"
  ): Config["plugins"]["legend"] {
    return {
      display: true,
      position: position,
      title: {
        display: true,
        text: title,
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
    };
  }

  // Bar Chart Configuration
  public barChartData: ChartConfiguration["data"] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: "Du 02/12/2024 au 08/12/2024",
        backgroundColor: "#1976D26A",
        borderColor: "#1976d2",
        borderWidth: 1,
      },
    ],
    labels: [
      "Development",
      "Design",
      "Testing",
      "Deployment",
      "Documentation",
      "Review",
      "Meeting",
    ],
  };

  public barChartOptions: ChartConfiguration = {
    type: "bar",
    data: this.barChartData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      plugins: {
        legend: this.createLegendConfig("Par catégories"),
      },
    },
  };

  public pieChartData: ChartConfiguration["data"] = {
    labels: ["En cours", "Terminé", "À faire", "Annulée"],
    datasets: [
      {
        data: [3, 50, 10, 5],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FFEE99"],
      },
    ],
  };

  public pieChartOptions: ChartConfiguration = {
    type: "pie",
    data: this.pieChartData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.7,
      plugins: {
        legend: this.createLegendConfig("Par statut"),
      },
    },
  };

  public chartClicked(event: any): void {
    console.log("Chart Clicked:", event);
  }

  public chartHovered(event: any): void {
    console.log("Chart Hovered:", event);
  }
}
