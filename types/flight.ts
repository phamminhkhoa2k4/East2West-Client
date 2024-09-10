interface SearchMetadata {
  id?: string;
  status?: string;
  json_endpoint?: string;
  created_at?: string;
  processed_at?: string;
  google_flights_url?: string;
  raw_html_file?: string;
  prettify_html_file?: string;
  total_time_taken?: number;
}

interface SearchParameters {
  engine?: string;
  hl?: string;
  gl?: string;
  type?: string;
  departure_id?: string;
  arrival_id?: string;
  outbound_date?: string;
  return_date?: string;
  adults?: number;
  children?: number;
  currency?: string;
  multi_city_json?: string;
}

interface Airport {
  id?: string;
  name?: string;
}

interface DepartureAirport {
  name?: string;
  id?: string;
  time?: string;
}

interface ArrivalAirport {
  name?: string;
  id?: string;
  time?: string;
}

interface Flight {
  departure_airport?: DepartureAirport;
  arrival_airport?: ArrivalAirport;
  duration?: number;
  airplane?: string;
  airline?: string;
  airline_logo?: string;
  travel_class?: string;
  flight_number?: string;
  legroom?: string;
  extensions?: string[];
  often_delayed_by_over_30_min?: boolean;
  overnight?: boolean
}

interface Layover {
  id?: string;
  duration?: number;
  name?: string;
  overnight?: boolean;
}

interface FlightDetails {
  flights?: Flight[];
  layovers?: Layover[];
  total_duration?: number;
  carbon_emissions?: {
    this_flight?: number;
    typical_for_this_route?: number;
    difference_percent?: number;
  };
  price?: number;
  type?: string;
  airline_logo?: string;
  booking_token?: string;
  departure_token?: string;
  extensions?: string[];
  
}

interface PriceInsights {
  lowest_price?: number;
  price_level?: string;
  typical_price_range?: [number, number];
}

interface AirportDetail {
  airport?: Airport;
  city?: string;
  country?: string;
  country_code?: string;
  image?: string;
  thumbnail?: string;
}

interface Airports {
  departure?: AirportDetail[];
  arrival?: AirportDetail[];
}

 

interface FlightSearchResponse {
  search_metadata?: SearchMetadata;
  search_parameters?: SearchParameters;
  best_flights?: FlightDetails[];
  other_flights?: FlightDetails[];
  price_insights?: PriceInsights;
  airports?: Airports[];
}
