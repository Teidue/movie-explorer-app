export interface OmdbSearchItem {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface OmdbSearchResponseSuccess {
  Search: OmdbSearchItem[];
  totalResults: string;
  Response: "True";
}

export interface OmdbSearchResponseError {
  Response: "False";
  Error: string;
}

export type OmdbSearchResponse = OmdbSearchResponseSuccess | OmdbSearchResponseError;

export interface OmdbMovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
  Type: string;
  BoxOffice?: string;
  Production?: string;
  Response: "True";
}

export interface OmdbMovieDetailError {
  Response: "False";
  Error: string;
}

export type OmdbMovieDetailResponse = OmdbMovieDetail | OmdbMovieDetailError;
