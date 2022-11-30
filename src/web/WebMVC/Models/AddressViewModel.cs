using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace NS.WebApp.MVC.Models
{
    public class AddressViewModel
    {
        [Required]
        public string PublicPlace { get; set; }
        [Required]
        [DisplayName("Número")]
        public string Number { get; set; }
        public string Complement { get; set; }
        [Required]
        public string Neighborhood { get; set; }
        [Required]
        [DisplayName("CEP")]
        public string Cep { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }

        public override string ToString()
        {
            return $"{PublicPlace}, {Number} {Complement} - {Neighborhood} - {City} - {State}";
        }
    }
}