using Microsoft.AspNetCore.Mvc;
using BackendService.Models;

namespace BackendService.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private static readonly string[] ProductNames = new[]
    {
        "Milk", "Carrot", "Fancy Treat", "Salad", "Meat"
    };

    private readonly ILogger<ProductController> _logger;

    public ProductController(ILogger<ProductController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Product> Get()
    {
        return Enumerable.Range(1, ProductNames.Length).Select(index => new Product
        {
            Id = index.ToString(),
            Name = ProductNames[index-1],
            Description = $"Fresh {ProductNames[index-1]}!",
            PublishedDateTime = DateTime.Now.ToString(),
            ExpiredDateTime = DateTime.Now.AddYears(1).ToString(),
            Price = index
        })
        .ToArray();
    }
    
}
