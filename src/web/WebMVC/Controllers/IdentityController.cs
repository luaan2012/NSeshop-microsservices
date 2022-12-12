using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Controllers;
using NS.WebMVC.Models;
using NS.WebMVC.Services;

namespace WebMVC.Controllers
{
    public class IdentityController : MainController
    {
        private readonly IAuthenticationsService _authenticationsService;
        private readonly IClientService _clientService;

        public IdentityController(IAuthenticationsService authenticationsService, IClientService clientService)
        {
            _authenticationsService = authenticationsService;
            _clientService = clientService;
        }

        [HttpGet]
        [Route("nova-conta")]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [Route("nova-conta")]
        public async Task<IActionResult> Register(UserRegister userRegister)
        {
            if (!ModelState.IsValid) return View(userRegister);

            var response = await _authenticationsService.Register(userRegister);

            if (ResponseHasError(response.ResponseResult)) return View(userRegister);

            if (response.AccessToken is null)
            {
                ModelState.AddModelError("", "Sistema indisponivel temporáriamente");
                return View(userRegister);
            }

            await _authenticationsService.SignIn(response);

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public async Task<IActionResult> Login(UserLogin userLogin, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            if (!ModelState.IsValid)
            {
                TempData["login"] = true;
                return RedirectToAction("Index", "Home");
            }

            var response = await _authenticationsService.Login(userLogin);

            if (ResponseHasError(response.ResponseResult))
            {
                TempData["login"] = true;
                TempData["error"] = response.ResponseResult.Errors.Messages.FirstOrDefault();
                return RedirectToAction("Index", "Home");
            }
            await _authenticationsService.SignIn(response);

            if (string.IsNullOrEmpty(returnUrl)) return RedirectToAction("Index", "Home");

            return LocalRedirect(returnUrl);
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _authenticationsService.Logout();
            return RedirectToAction("Index", "Home");
        }
    }
}
