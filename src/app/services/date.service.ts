import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    constructor() { }

    public parseDate(
        dateString: string,
        timeString: string,
        dateDelimiter = '/',
        timeDelimiter = ':'
    ) {
        const dateArray = dateString.split(dateDelimiter);
        const aTimeArray = timeString.split(timeDelimiter);

        return new Date(
            Number(dateArray[0]),       // Year
            Number(dateArray[1]) - 1,   // Month
            Number(dateArray[2]),       // Date
            Number(aTimeArray[0]),      // Hour
            Number(aTimeArray[1])       // Sec
        );
    }

}