using System.Text.Json.Serialization;

namespace FetchLocation.Web.Entities;

public record Coordinates(
    [property: JsonPropertyName("latitude")]
    double Latitude,
    [property: JsonPropertyName("longitude")]
    double Longitude)
{
    public override string ToString() => $"{Latitude}, {Longitude}";
    public string ToUriString() => $"{Latitude},{Longitude}";
}
