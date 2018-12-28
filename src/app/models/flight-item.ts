export interface FlightItem {
    arrivalTime: string;
    departureTime: string;
    destination: string;
    flightNo: string;
    name: string;
    duration: string;
    origin: string;
    price: number;
    arrivalDt: Date;
    departureDt: Date;
}
export interface FlightDTO {
    item: FlightItem;
    isMultiple: boolean;
    data: FlightItem[];
}
