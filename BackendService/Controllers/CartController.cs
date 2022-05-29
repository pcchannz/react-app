using Microsoft.AspNetCore.Mvc;
using BackendService.Models;

namespace BackendService.Controllers;

[ApiController]
[Route("[controller]")]
public class CartController : ControllerBase
{
    private readonly ILogger<CartController> _logger;

    public CartController(ILogger<CartController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public int PostShipping([FromBody] Order order)
    {
        double totalAmount = order.Items.Sum(item => item.Product.Price * item.Quantity * order.CurrencyRate );
        return (totalAmount < 50 ) ? 10 : 20;
    }
    
}
