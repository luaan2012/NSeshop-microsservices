using Microsoft.AspNetCore.Mvc;
using NS.ApiCore.Controllers;
using NS.Catalog.API.Models;
using NS.Catalogo.API.Data.Interface;

namespace NS.Catalogo.API.Controllers
{
    public class BannerController : MainController
    {
        private readonly IBannerRepository _bannerRepository;

        public BannerController(IBannerRepository bannerRepository)
        {
            _bannerRepository = bannerRepository;
        }

        [HttpGet("Banners")]
        public async Task<IEnumerable<Banner>> GetBanners()
        {
            return await _bannerRepository.GetBanners();
        }
    }
}
