using Microsoft.AspNetCore.Mvc;
using NS.Core.Communication;

namespace NS.WebMVC.Controllers
{
    public class MainController : Controller
    {
        protected bool ResponseHasError(ResponseResult response)
        {
            if (response != null && response.Errors.Messages.Any())
            {
                foreach (var message in response.Errors.Messages)
                {
                    ModelState.AddModelError(string.Empty, message);
                }

                return true;
            }

            return false;
        }

        protected void AddErrorValidation(string message)
        {
            ModelState.AddModelError(string.Empty, message);
        }

        protected bool OperationValid()
        {
            return ModelState.ErrorCount == 0;
        }
    }
}