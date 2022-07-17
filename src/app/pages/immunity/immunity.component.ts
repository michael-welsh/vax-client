import { Component } from '@angular/core';
import Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/data.service';
import { Constants } from 'app/config/constants';

@Component({
  selector: 'immunity-cmp',
  moduleId: module.id,
  templateUrl: 'immunity.component.html'
})

export class ImmunityComponent {
  public canvas: any;
  public ctx;
  public chartColor;
  public herdChart;
  public errorMessage;

  public sevenDayAverageFirsts;
  public sevenDayAverageSeconds;
  public totalAverageFirsts; 
  public totalAverageSeconds;

  constructor(private http: HttpClient, private dservice: DataService) { }


  ngOnInit() {

    this.chartColor = "#FFFFFF";

    this.canvas = document.getElementById("herdChart");
    this.ctx = this.canvas.getContext("2d");
    this.herdChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Shot 1',
            data: [],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Shot 2',
            data: [12, 13],
            borderColor: "blue",
            fill: false,
          },
          {
            label: 'Herd Immunity Threshold',
            data: [],
            borderColor: "green",
            borderDash: [20, 30],
            fill: false,
            pointStyle: "dash"
          },
          {
            label: 'Path to HI (1 Shot)',
            data: [],
            borderColor: "orange",
            borderDash: [5, 10],
            fill: false,
            pointStyle: "dash"
          },
          {
            label: 'Path to HI (2 Shots)',
            data: [],
            borderColor: "orange",
            borderDash: [5, 10],
            fill: false,
            pointStyle: "dash"
          }
        ]
      },
      options: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {          
          position: 'bottom'       
        }    
      }
    });

  
    this.dservice.get(Constants.API_AVERAGES).subscribe({
      next: data => {
        this.sevenDayAverageFirsts = data.first_shot_7_day_average;
        this.sevenDayAverageSeconds = data.second_shot_7_day_average;
        this.totalAverageFirsts = data.first_shot_total_average;
        this.totalAverageSeconds = data.second_shot_total_average;
      }
    });


    // run the default display
    this.calculateAndDisplay();
  }

  calculateAndDisplay(){

    let weekLabels = [];
    let weeklyFirsts = [];
    let weeklySeconds = [];
    let herdImmunityThreshold = this.dservice.getHerdImmunityThreshold(this.chosenThreshold);
    let lastRecordedDate;
    

    this.dservice.get(Constants.API_ACCUMULATIVE_TOTALS).subscribe({
      next: accum_data => {

        // Herd Immunity Threshold line
        var herdPercentageLine = []
        for (let i = 0; i < accum_data.firsts.length + 20; i++) {
          herdPercentageLine.push(herdImmunityThreshold);
        }

        // Create graph data for the existing records
        var counter = 0;
        var lastDailyTotalFirsts;
        var lastDailyTotalSeconds;

        for (let x = 0; x < accum_data.firsts.length; x++) {
          if (counter == 7) {
            weeklyFirsts.push(accum_data.firsts[x]);
            weeklySeconds.push(accum_data.seconds[x]);

            lastRecordedDate = accum_data.dates[x]
            lastDailyTotalFirsts = accum_data.firsts[x]
            lastDailyTotalSeconds = accum_data.seconds[x];

            const d = new Date(accum_data.dates[x]);
            const month = Constants.months[d.getMonth()];
            weekLabels.push(month + " " + d.getDate() );

            counter = 0;
          }
          counter++;
        }

        var firstsAverage;
        var secondsAverage;


        // Cal
        if(this.chosenRollingAverage == '7-Day Rolling Average'){
          firstsAverage = this.sevenDayAverageFirsts;
          secondsAverage = this.sevenDayAverageSeconds;
        } else {
          firstsAverage = this.totalAverageFirsts;
          secondsAverage = this.totalAverageSeconds;
        }

        var herdImmunityDisplayFirsts = this.createDisplayData(weeklyFirsts.length, lastDailyTotalFirsts, firstsAverage, herdImmunityThreshold)
        var herdImmunityDisplaySeconds = this.createDisplayData(weeklySeconds.length, lastDailyTotalSeconds, secondsAverage, herdImmunityThreshold)

        // Ensure the number of weeks in the graph is fixed (don't change the graph to adapt to the data). This value might need to be updated later
        var weeksInGraph = 22;

        // Create date labels for the weeks where there was no data
        const d = new Date(lastRecordedDate);
        for (let y = 0; y < weeksInGraph; y++) {   
          d.setDate(d.getDate() + 7)
          const month = Constants.months[d.getMonth()];
          weekLabels.push(month + " " + d.getDate() );
        }

        this.herdChart.data.labels = weekLabels;
        this.herdChart.data.datasets[0].data = weeklyFirsts;
        this.herdChart.data.datasets[1].data = weeklySeconds;
        this.herdChart.data.datasets[2].data = herdPercentageLine;
        this.herdChart.data.datasets[3].data = herdImmunityDisplayFirsts;
        this.herdChart.data.datasets[4].data = herdImmunityDisplaySeconds;
        this.herdChart.update();


      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error displaying Herd Immunity data', error);
      }
    });
  }

  createDisplayData(numberOfWeeks: number, lastDailyTotal: number, movingAverage: number, herdImmunityThreshold: number): number[] {

    var pathToHerdImmunity = [];

    // Path to HI starts with empty data
    var herdImmunityDeadSpace = [];
    for (let z = 0; z < numberOfWeeks - 1; z++) {
      herdImmunityDeadSpace.push(',');
    }

    // Start with the last value of the actual data
    pathToHerdImmunity.push(lastDailyTotal);

    var herdImmunityWeekCounter = 7;

    while (pathToHerdImmunity[pathToHerdImmunity.length - 1] < herdImmunityThreshold) {
      pathToHerdImmunity.push(lastDailyTotal + (herdImmunityWeekCounter * movingAverage));
      herdImmunityWeekCounter += 7;
    }

    var herdImmunityDisplay = [...herdImmunityDeadSpace, ...pathToHerdImmunity]

    return herdImmunityDisplay;
  }

  // Rolling Average Dropdown
  public rollingAverages: string[] = ["7-Day Rolling Average", "Overall Average"];
  public chosenRollingAverage: string = "7-Day Rolling Average";

  chooseRollingAverage(newAverage: string){
    this.chosenRollingAverage = newAverage;
    this.calculateAndDisplay();
  }

  // Herd Immunity Threshold dropdown
  public thresholdOptions: string[] = ["60%", "70%", "80%", "90%"];
  public chosenThreshold: string = "70%";

  chooseThreshold(newHiThreshold: string) { 
    this.chosenThreshold = newHiThreshold;
    this.calculateAndDisplay();
  }
  

}
