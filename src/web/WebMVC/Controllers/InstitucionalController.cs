﻿using Microsoft.AspNetCore.Mvc;

namespace WebMVC.Controllers
{
    public class InstitucionalController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult About()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }
    }
}
