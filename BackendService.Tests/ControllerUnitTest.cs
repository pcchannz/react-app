using BackendService.Controllers;
using BackendService.Models;
using Moq;
using Microsoft.Extensions.Logging;
namespace BackendService.Tests;

public class ControllerUnitTest
{
    [Fact]
    public void Get_Products_OK()
    {
        // Arrange
        ProductController productController = new ProductController(Mock.Of<ILogger<ProductController>>());
        
        // Act
        var products = productController.Get();

        // Assert
        Assert.NotEmpty(products);
    }

    [Fact]
    public void Get_Product_DateFormat_OK() 
    {
        // Arrange
        ProductController productController = new ProductController(Mock.Of<ILogger<ProductController>>());

        // Act
        bool isGoodDateFormat = productController.Get().All(product => DateTime.TryParse(product.ExpiredDateTime, out _));

        // Assert
        Assert.True(isGoodDateFormat);

    }

    [Theory]
    [InlineData(1, 1, 1, 1, 10)]
    [InlineData(1, 5, 5, 2, 20)]
    [InlineData(1, 10, 5, 1, 20)]
    [InlineData(1, 10, 4.99, 1, 10)]
    [InlineData(5, 10, 1, 1, 20)]
    public void Calculate_Cart_Shipping_OK(int orderCount, int quantity, float price, float rate, int expected) 
    {
        // Arrange
        CartController cartController = new CartController(Mock.Of<ILogger<CartController>>());
        
        ProductOrder[] productOrders = Enumerable.Range(1, orderCount)
            .Select(i => 
                new ProductOrder {
                    Quantity = quantity,
                    Product = new Product {
                        Price = price
                },
            }).ToArray();

        var order = new Order {
            CurrencyRate = rate,
            Items = productOrders
        };

        // Act
        var result = cartController.PostShipping(order);

        // Assert
        Assert.Equal(expected, result);
    }
}