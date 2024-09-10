// Định nghĩa kiểu dữ liệu cho GPS coordinates
export interface GPSCoordinates {
  latitude: number;
  longitude: number;
}

// Định nghĩa kiểu dữ liệu cho Nearby Place
export interface NearbyPlace {
  name: string;
  transportations: {
    type: string;
    duration: string;
  }[];
}

// Định nghĩa kiểu dữ liệu cho Image
export interface Image {
  thumbnail: string;
  original_image: string;
}

// Định nghĩa kiểu dữ liệu cho Rating
export interface Rating {
  stars: number;
  count: number;
}

// Định nghĩa kiểu dữ liệu cho Reviews Breakdown
export interface ReviewsBreakdown {
  name: string;
  description: string;
  total_mentioned: number;
  positive: number;
  negative: number;
  neutral: number;
}

export interface Property {
  type: string;
  name: string;
  description?: string;
  link: string;
  gps_coordinates: GPSCoordinates;
  check_in_time: string;
  check_out_time: string;
  rate_per_night: {
    lowest: string;
    extracted_lowest: number;
    before_taxes_fees: string;
    extracted_before_taxes_fees: number;
  };
  total_rate: {
    lowest: string;
    extracted_lowest: number;
    before_taxes_fees: string;
    extracted_before_taxes_fees: number;
  };
  nearby_places: NearbyPlace[];
  hotel_class?: string;
  extracted_hotel_class?: number;
  images: Image[];
  overall_rating: number;
  reviews: number;
  ratings: Rating[];
  location_rating: number;
  reviews_breakdown: ReviewsBreakdown[];
  amenities: string[];
  property_token: string;
  serpapi_property_details_link: string;
}

// Định nghĩa kiểu dữ liệu cho các phần còn lại
export interface SearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_hotels_url: string;
  raw_html_file: string;
  prettify_html_file: string;
  total_time_taken: number;
}

export interface SearchParameters {
  engine: string;
  q: string;
  gl: string;
  hl: string;
  currency: string;
  check_in_date: string;
  check_out_date: string;
  adults: number;
  children: number;
}

export interface SearchInformation {
  total_results: number;
}

export interface SerpApiPagination {
  current_from: number;
  current_to: number;
  next_page_token: string;
  next: string;
}

// Định nghĩa kiểu dữ liệu tổng thể cho hotels
export interface Hotel {
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  search_information: SearchInformation;
  brands: {
    id: number;
    name: string;
    children: {
      id: number;
      name: string;
    }[];
  }[];
  properties: Property[];
  serpapi_pagination: SerpApiPagination;
}
