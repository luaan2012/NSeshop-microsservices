namespace NS.Pagamentos.API.Models
{
    public enum StatusTransaction
    {
        Authorize = 1,
        Pay,
        Denied,
        Reversed,
        Canceled
    }
}