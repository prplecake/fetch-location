using System.Text.Json;
using FetchLocation.Web.Entities;
using GeoJSON.Text.Feature;

namespace FetchLocation.Web.Services;

public class NwsApiService
{
    private readonly HttpClient _httpClient = new();
    public async Task<GridPoints> GetGridPointsAsync(Coordinates coordinates)
    {
        var requestUri = $"https://api.weather.gov/points/{coordinates.ToUriString()}";
        var response = await _httpClient.GetAsync(requestUri);
        response.EnsureSuccessStatusCode();
        string content = await response.Content.ReadAsStringAsync();
        var feature = JsonSerializer.Deserialize<Feature>(content);
        return new GridPoints(feature);
    }
    public async Task<List<WeatherStation>> GetWeatherStationsAsync(GridPoints gridPoints)
    {
        var requestUri = $"https://api.weather.gov/gridpoints/{gridPoints.GridId}/{gridPoints.X},{gridPoints.Y}/stations";
        Console.WriteLine($"requestUri: {requestUri}");
        var response = await _httpClient.GetAsync(requestUri);
        response.EnsureSuccessStatusCode();
        string content = await response.Content.ReadAsStringAsync();
        var featureCollection = JsonSerializer.Deserialize<FeatureCollection>(content);
        List<WeatherStation> wxStations = [];
        if (featureCollection is not null && featureCollection.Features.Count > 0)
            wxStations = featureCollection.Features.Select(f => new WeatherStation(f)).ToList();
        return wxStations;
    }
}
