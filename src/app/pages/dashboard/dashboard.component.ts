import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/data.service';
import { Constants } from 'app/config/constants';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})


export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public errorMessage;
  public firstShotPercentage;
  public secondShotPercentage;
  public daysToHerdImmunity; 

  constructor(private http: HttpClient, private dservice: DataService) { }

    ngOnInit(){
      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                  label: 'First shot',
                  data: [],
                  borderColor: "#3e95cd",
                  fill: false,
                },
                {
                  label: 'Second shot',
                  data: [],
                  borderColor: "#3cba9f",
                  fill: false,
                },
                {
                  label: 'Total',
                  data: [],
                  borderColor: "#c45850",
                  fill: false,
                }
            ]
        },
        options: {
            tooltips: {
                mode: 'index',
                intersect: false
            }
        }
    });

    this.dservice.get(Constants.API_ACCUMULATIVE_TOTALS).subscribe({
      next: accum_data => {

        var lastDailyTotalFirsts = accum_data.firsts[accum_data.firsts.length - 1]
        var herdImmunityThreshold = this.dservice.getHerdImmunityThreshold('70%');
        this.daysToHerdImmunity = this.dservice.calculateDaysToHerdImmunity(herdImmunityThreshold, 32000, lastDailyTotalFirsts);

        }      
    });


      this.dservice.get(Constants.API_DAILY_TOTALS).subscribe({
        next: data => {
        this.chartEmail.data.labels = data.dates;
        this.chartEmail.data.datasets[0].data = data.firsts;
        this.chartEmail.data.datasets[1].data = data.seconds;
        this.chartEmail.data.datasets[2].data = data.totals;
        this.chartEmail.update();
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }        
    });


    this.dservice.get(Constants.API_PERCENTAGES).subscribe({
      next: data => {
        this.firstShotPercentage = data.first_shot_percentage;
        this.secondShotPercentage = data.second_shot_percentage;
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }        
    });

    }
}
