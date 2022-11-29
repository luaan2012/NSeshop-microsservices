﻿using System.Linq;

namespace NS.Core.Utils
{
    public static class StringUtils
    {
        public static string JustNumbers(this string str)
        {
            return new string(str.Where(char.IsDigit).ToArray());
        }
    }
}