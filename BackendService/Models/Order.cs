namespace BackendService.Models;

public record Order{
    public string? Id { get; }
    public ProductOrder[] Items { get; set; }
    public string? UserId { get; set; }

    public string? MobileNumber { get; set; }

    public string? Address { get; set; }

    public string? Remarks { get; set; }
    public Currency Currency { get; set; }
    public double CurrencyRate { get; set; }
}