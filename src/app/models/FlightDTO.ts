import { FlightItem } from './flight-item';

export interface FlightDTO {
    item: FlightItem;
    isMultiple: boolean;
    data: FlightItem[];
}