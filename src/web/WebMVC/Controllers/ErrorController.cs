using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Models;

namespace NS.WebMVC.Controllers
{
    public class ErrorController : MainController
    {
        [Route("sistema-indisponivel")]
        public IActionResult SistemaIndisponivel()
        {
            var modelErro = new ErrorViewModel
            {
                Message = "O sistema está temporariamente indisponível. <br/><br/>Isto pode ocorrer em momentos de sobrecarga de usuários.",
                Tittle = "Sistema indisponível.",
                ErroCode = 500
            };

            return View("Error", modelErro);
        }


        [Route("erro/{id:length(3,3)}")]
        public IActionResult Error(int id)
        {
            var modelErro = new ErrorViewModel();

            if (id == 500)
            {
                modelErro.Message = "Ocorreu um erro! Tente novamente mais tarde ou contate nosso suporte.";
                modelErro.Tittle = "Ocorreu um erro!";
                modelErro.ErroCode = id;
            }
            else if (id == 404)
            {
                modelErro.Message =
                    "A página que está procurando não existe! <br/><br/>Em caso de dúvidas entre em contato com nosso suporte";
                modelErro.Tittle = "Ops! Página não encontrada.";
                modelErro.ErroCode = id;
            }
            else if (id == 403)
            {
                modelErro.Message = "Você não tem permissão para fazer isto.";
                modelErro.Tittle = "Acesso Negado";
                modelErro.ErroCode = id;
            }
            else
            {
                return StatusCode(404);
            }

            return View("Error", modelErro);
        }
    }
}
