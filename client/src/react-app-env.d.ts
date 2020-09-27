// eslint-disable-next-line
/// <reference types="react-scripts" />
interface IFlights {
  [key: string]: T;
  arrival: IFlight[];
  departure: IFlight[];
}

interface IFlight {
  [key: string]: T;
  ID: number;
  actual: string;
  airline: IAirline;
  'airportToID.city_en'?: string;
  'airportFromID.city_en'?: string;
  checkinNo?: string;
  codeShareData: Array<ICodeData>;
  gateNo?: string;
  status: typeof Status;
  timeDepShedule: string;
  timeToStand: string;
  timeTakeofFact?: string;
  term: string;
}
