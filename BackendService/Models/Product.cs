using System.Text.Json.Serialization;

namespace BackendService.Models;

public class Product
{
    public string? Id { get; set; }
    public string? Name { get; set; }

    public string? Description { get; set; }

    public float Price { get; set; }
    public string? PublishedDateTime { get; set; }

    public string? ExpiredDateTime { get; set; }

}
