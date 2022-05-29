namespace BackendService.Models;

public class ProductOrder {
    public Product Product { get; set; }
    public int Quantity { get; set; }
    public string? Remarks { get; set; }
}