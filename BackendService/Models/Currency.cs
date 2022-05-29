using System.Text.Json.Serialization;

namespace BackendService.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Currency {
    AUD, NZD, USD
}