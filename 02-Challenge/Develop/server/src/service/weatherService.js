import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
// Define a class for the Weather object
class Weather {
    constructor(temperature, description, icon) {
        this.temperature = temperature;
        this.description = description;
        this.icon = icon;
    }
}
// Complete the WeatherService class
class WeatherService {
    constructor() {
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
        this.apiKey = process.env.OPENWEATHER_API_KEY || '';
        this.city = '';
    }
    // Create fetchLocationData method
    async fetchLocationData(query) {
        const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
        return response.json();
    }
    // Create destructureLocationData method
    destructureLocationData(locationData) {
        const { lat, lon } = locationData[0];
        return { lat, lon };
    }
    // Create buildGeocodeQuery method
    buildGeocodeQuery() {
        return `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
    }
    // Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
    }
    // Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData() {
        const locationData = await this.fetchLocationData(this.city);
        return this.destructureLocationData(locationData);
    }
    // Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const response = await fetch(this.buildWeatherQuery(coordinates));
        return response.json();
    }
    // Build parseCurrentWeather method
    parseCurrentWeather(response) {
        const { main, weather } = response;
        return new Weather(main.temp, weather[0].description, weather[0].icon);
    }
    // Complete buildForecastArray method
    buildForecastArray(currentWeather, weatherData) {
        return weatherData.map((data) => new Weather(data.main.temp, data.weather[0].description, data.weather[0].icon));
    }
    // Complete getWeatherForCity method
    async getWeatherForCity(city) {
        this.city = city;
        const coordinates = await this.fetchAndDestructureLocationData();
        const weatherData = await this.fetchWeatherData(coordinates);
        return this.parseCurrentWeather(weatherData);
    }
}
export default new WeatherService();
