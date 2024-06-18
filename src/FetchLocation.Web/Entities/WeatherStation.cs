using GeoJSON.Text.Feature;

namespace FetchLocation.Web.Entities;

public class WeatherStation
{
    public WeatherStation(Feature feature)
    {
        Name = feature.Properties["name"].ToString();
        StationIdentifier = feature.Properties["stationIdentifier"].ToString();
    }
    public string? Name { get; set; }
    public string? StationIdentifier { get; set; }
}
