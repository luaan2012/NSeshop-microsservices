using NS.Catalog.API.Models;

namespace NS.Catalogo.API.Data.Interface
{
    public interface IBannerRepository
    {
        Task<List<Banner>> GetBanners();
    }
}
