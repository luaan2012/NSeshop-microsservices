using Microsoft.EntityFrameworkCore;
using NS.Catalog.API.Data;
using NS.Catalog.API.Models;
using NS.Catalogo.API.Data.Interface;

namespace NS.Catalogo.API.Data.Repository
{
    public class BannerRepository : IBannerRepository
    {
        private readonly CatalogContext _context;

        public BannerRepository(CatalogContext context)
        {
            _context = context;
        }

        public async Task<List<Banner>> GetBanners()
        {
            return await _context.Banners.ToListAsync();
        }
    }
}
