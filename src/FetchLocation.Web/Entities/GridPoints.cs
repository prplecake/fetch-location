using GeoJSON.Text.Feature;

namespace FetchLocation.Web.Entities;

public class GridPoints
{
    public GridPoints(Feature feature)
    {
        GridId = feature.Properties["gridId"].ToString();
        if (int.TryParse(feature.Properties["gridX"].ToString(), out int x))
            X = x;
        if (int.TryParse(feature.Properties["gridY"].ToString(), out int y))
            Y = y;
    }
    public string? GridId { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public override string ToString() => $"{X}, {Y}";
}
