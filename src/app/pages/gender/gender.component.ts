import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';


@Component({
    moduleId: module.id,
    selector: 'gender-cmp',
    templateUrl: 'gender.component.html'
})

export class GenderComponent implements OnInit {

    public canvas : any;
    public ctx;
    public chartColor;
    public chartEmail;
    public genderChart;
    public ageChart;
    public errorMessage;

  
    constructor(private http: HttpClient) { }

    ngOnInit(){
        
        let ageTotal = 0;
        let genderTotal = 0;

        const CHART_COLORS = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
          };
          
          const NAMED_COLORS = [
            CHART_COLORS.red,
            CHART_COLORS.orange,
            CHART_COLORS.yellow,
            CHART_COLORS.green,
            CHART_COLORS.blue,
            CHART_COLORS.purple,
            CHART_COLORS.grey,
          ]; 

        const genderData = {
          labels: ['Women', 'Men'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [],
              backgroundColor: [ CHART_COLORS.red, CHART_COLORS.blue],
            }
          ]
        };        
        this.chartColor = "#FFFFFF";
  
        this.canvas = document.getElementById("genderChart");
        this.ctx = this.canvas.getContext("2d");

        this.genderChart = new Chart(this.ctx, {
            type: 'doughnut',
            data: genderData,
              options: {
                responsive: true,
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function (tooltipItem, data) {
                            let x = data['datasets'][0]['data'][tooltipItem['index']];
                            return Number(x).toLocaleString();
                        },
                        afterLabel: function (tooltipItem, data) {
                            var dataset = data['datasets'][0];
                            var percent = (dataset['data'][tooltipItem['index']] / genderTotal) * 100
                            return '(' + percent.toFixed(2) + '%)';
                        }
                    },
                    backgroundColor: CHART_COLORS.grey,
                    titleFontSize: 16,
                    titleFontColor: CHART_COLORS.purple,
                    bodyFontColor: '#000',
                    bodyFontSize: 14,
                    displayColors: false
                },
                legend: {
                    position: 'bottom',
                }

            },
        });
          
          
        this.http.get<any>('https://static.data.gov.hk/covid-vaccine/pie_gender.json').subscribe({
          next: data => {
            genderTotal = 0;
            genderData.datasets[0].data[0] = data.data[0].value;
            genderData.datasets[0].data[1] = data.data[1].value;
            genderTotal += data.data[0].value; // add women to the total
            genderTotal += data.data[1].value; // add men to the total
            this.genderChart.data = genderData;
            this.genderChart.update();
          },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error);
          }        
        });


        const ageData = {
            labels: [],
            datasets: [
                {
                    label: 'Age Dataset',
                    data: [],
                    backgroundColor: ['red', 'blue']
                }
            ]
        };
        this.chartColor = "#FFFFFF";

        this.canvas = document.getElementById("ageChart");
        this.ctx = this.canvas.getContext("2d");
    
        this.ageChart = new Chart(this.ctx, {
            type: 'doughnut',
            data: ageData,
            options: {
                responsive: true,
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function (tooltipItem, data) {
                            let x = data['datasets'][0]['data'][tooltipItem['index']];
                            return Number(x).toLocaleString();
                        },
                        afterLabel: function (tooltipItem, data) {
                            var ageDataset = data['datasets'][0];
                            var percent = (ageDataset['data'][tooltipItem['index']] / ageTotal) * 100
                            return '(' + percent.toFixed(2) + '%)';
                        }
                    },
                    backgroundColor: '#FFF',
                    titleFontSize: 16,
                    titleFontColor: CHART_COLORS.purple,
                    bodyFontColor: '#000',
                    bodyFontSize: 14,
                    displayColors: false
                },
                legend: {
                    position: 'bottom',
                },
            },
        });
            
            
        this.http.get<any>('https://static.data.gov.hk/covid-vaccine/pie_age.json').subscribe({
            next: data => {
                ageTotal = 0;
                for (let i = 0; i < data.data.length; i++) {
                    ageData.labels[i] = data.data[i].group;
                    ageData.datasets[0].data[i] = data.data[i].age;
                    ageTotal += data.data[i].age;
                    ageData.datasets[0].backgroundColor[i] = NAMED_COLORS[i];
                };
                this.ageChart.data = ageData;
                this.ageChart.update();
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
        });
  

   
            
  
    }

  }
  