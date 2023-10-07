
namespace App_Taxi_BackEnd.Models
{
    public class Result
    {
        public string Title { get; set; } = "";
        public string Message { get; set; } = "";
        public ResultType Type { get; set; } = 0;
        public object Data { get; set; } = null!;
    }
    public enum ResultType
    {
        error = 0,
        success = 1,
        warning = 2,
        info = 3,
    }
}
