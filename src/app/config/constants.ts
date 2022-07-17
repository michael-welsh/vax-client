import { Injectable } from '@angular/core'; 

@Injectable() 
export class Constants {

    public static API_DAILY_TOTALS: string = 'https://vax-backend.cloudaxis.com/api/delta'; 
    public static API_ACCUMULATIVE_TOTALS: string = 'https://vax-backend.cloudaxis.com/api/data'; 
    public static API_PERCENTAGES: string = 'https://vax-backend.cloudaxis.com/api/percentage';
    public static API_AVERAGES: string = 'https://vax-backend.cloudaxis.com/api/averages';

    public static TitleOfSite: string = " Hong Kong Vaccinations"; 

    public static HK_POPULATION: number = 7496988;

    public static months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]

} 