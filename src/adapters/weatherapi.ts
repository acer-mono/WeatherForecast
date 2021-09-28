import moment from "moment";
import { PreviewForecast } from "@/store";

type CurrentForecastResponse = {
  current: {
    temp_c: string;
    last_updated: string;
    humidity: string;
    wind_mph: string;
    wind_degree: string;
    pressure_mb: string;
    vis_km: string;
    condition: {
      icon: string;
    };
  };
};

type ForecastDayResponse = {
  avgtemp_c: string;
  avghumidity: string;
  condition: {
    icon: string;
  };
};

type ForecastResponse = {
  date: string;
  day: ForecastDayResponse;
};

type ForecastsResponse = {
  forecast: {
    forecastday: Array<ForecastResponse>;
  };
};

function convertCurrentForecast(response: CurrentForecastResponse) {
  return {
    id: response.current.temp_c,
    date: moment(new Date(response.current.last_updated)).format("D MMMM YYYY"),
    temperature: response.current.temp_c,
    humidity: response.current.humidity,
    windSpeed: response.current.wind_mph,
    windDirection: response.current.wind_degree,
    airPressure: response.current.pressure_mb,
    visibility: response.current.vis_km,
    icon: `http:${response.current.condition.icon}`,
  };
}

function convertForecasts(response: ForecastsResponse): PreviewForecast[] {
  const forecasts = [] as PreviewForecast[];
  response.forecast.forecastday.forEach(
    ({ date, day }: { date: string; day: ForecastDayResponse }) => {
      const current = {
        id: date,
        date: moment(new Date(date)).format("DD.MM"),
        temperature: day.avgtemp_c,
        humidity: day.avghumidity,
        icon: `http:${day.condition.icon}`,
      };
      forecasts.push(current);
    }
  );
  return forecasts;
}

export { convertCurrentForecast, convertForecasts };
