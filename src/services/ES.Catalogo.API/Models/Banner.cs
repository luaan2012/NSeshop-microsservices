using NS.Core.DomainObjects;

namespace NS.Catalog.API.Models
{
    public class Banner : Entity
    {
        public string Image { get; set; }
        public string AltImage { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Message { get; set; }
        public int TimeSleep { get; set; }
    }
}
