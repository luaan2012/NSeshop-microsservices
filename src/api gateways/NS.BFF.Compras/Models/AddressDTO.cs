namespace NS.BFF.Compras.Models
{
    public class AddressDTO
    {
        public string PublicPlace { get; set; }
        public string Number{ get; set; }
        public string Complement { get; set; }
        public string Neighborhood { get; set; }
        public string Cep { get; set; }
        public string City { get; set; }
        public string State { get; set; }
		public string CompletAddress 
        {
			get
			{
                return $"{PublicPlace}, {Number} {Complement} - {Neighborhood} - {City} - {State}";
            }
        }
	}
}