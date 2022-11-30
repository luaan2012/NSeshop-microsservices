using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NSE.WebApp.MVC.Models;
using Refit;

namespace NSE.WebApp.MVC.Services
{
    public interface ICatalogoService
    {
        Task<IEnumerable<ProductViewModel>> ObterTodos();
        Task<ProductViewModel> ObterPorId(Guid id);
    }

    public interface ICatalogoServiceRefit
    {
        [Get("/catalogo/produtos/")]
        Task<IEnumerable<ProductViewModel>> ObterTodos();

        [Get("/catalogo/produtos/{id}")]
        Task<ProductViewModel> ObterPorId(Guid id);
    }
}