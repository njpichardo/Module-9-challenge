import fs from 'fs/promises';
import path from 'path';
// Define a City class with name and id properties
class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
// Complete the HistoryService class
class HistoryService {
    constructor() {
        this.filePath = path.join(__dirname, 'searchHistory.json');
    }
    // Define a read method that reads from the searchHistory.json file
    async read() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    // Define a write method that writes the updated cities array to the searchHistory.json file
    async write(cities) {
        await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    }
    // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities() {
        return await this.read();
    }
    // Define an addCity method that adds a city to the searchHistory.json file
    async addCity(name) {
        const cities = await this.read();
        const id = (cities.length + 1).toString();
        const newCity = new City(id, name);
        cities.push(newCity);
        await this.write(cities);
    }
    // BONUS: Define a removeCity method that removes a city from the searchHistory.json file
    async removeCity(id) {
        let cities = await this.read();
        cities = cities.filter(city => city.id !== id);
        await this.write(cities);
    }
}
export default new HistoryService();
