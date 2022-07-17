import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'dailies-cmp',
    moduleId: module.id,
    templateUrl: 'dailies.component.html'
})

export class DailiesComponent implements OnInit{

    public canvas : any;
    public ctx;
    public chartColor;
    public chartEmail;
    public chartHours;
    public errorMessage;
  
    constructor(private http: HttpClient) { }
  
      ngOnInit(){
        this.chartColor = "#FFFFFF";
  
        this.canvas = document.getElementById("chartHours");
        this.ctx = this.canvas.getContext("2d");
  
        this.chartHours = new Chart(this.ctx, {
          type: 'bar',
          data: {
              labels: [],
              datasets: [
                  {
                    label: 'First shot',
                    data: [],
                    backgroundColor: "rgba(75,192,192,0.4)",
                  },
                  {
                    label: 'Second shot',
                    data: [],
                    backgroundColor: "rgba(75,22,192,0.4)",
                  }
              ]
          },
          options: {
              tooltips: {
                  mode: 'index',
                  intersect: false
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true
                }
              }
          }
        });
  
        this.http.get<any>('https://vax-backend.cloudaxis.com/api/data').subscribe({
          next: data => {
            this.chartHours.data.labels = this.formatDates(data.dates);
            this.chartHours.data.datasets[0].data = data.firsts;
            this.chartHours.data.datasets[1].data = data.seconds;
            this.chartHours.update();
          },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error);
          }        
        });
    
    }

    formatDates(rawDates: string[]): string[]{

      var formattedDates = [];

      for(let x=0; x<rawDates.length; x++){
          const d = new Date(rawDates[x]);
          formattedDates[x] = d.getDate() + "/" + (d.getMonth() + 1);
      }
      return formattedDates;
    }
  }
  