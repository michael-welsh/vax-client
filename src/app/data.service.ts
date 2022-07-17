import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './config/constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  

  constructor(private http: HttpClient) {  }


  public get(url: string, options?: any): any { 
    return this.http.get(url, options); 
  } 


  public getHerdImmunityThreshold(percentageOfPopulation: string){

    let percent: number;

    switch(percentageOfPopulation){
      case "60%":
        percent = 0.6;
        break;
      case "70%":
        percent = 0.7;
        break;
      case "80%":
        percent = 0.8;
        break;
      case "90%":
        percent = 0.9;
        break;
      default:
        percent = 0.7;
    }

    return Constants.HK_POPULATION * percent;
  }


  public calculateDaysToHerdImmunity(herdImmunityThreshold: number, movingAverage: number, lastDailyTotal: number): number {

    // Calculate the delta to herd immunity
    var deltaToHerdImmunity = herdImmunityThreshold - lastDailyTotal;

    // How many seven day averages do we need to reach herd immunity?
    var daysToHerdImmunity = 0;
    var deltaTemp = 0;

    while (deltaTemp < deltaToHerdImmunity) {
      deltaTemp = daysToHerdImmunity * movingAverage;
      daysToHerdImmunity++;
    }

    return daysToHerdImmunity;
  }

}
