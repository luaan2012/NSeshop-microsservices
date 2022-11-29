﻿using NS.Core.Utils;

namespace NS.Core.DomainObjects
{
    public class Cpf
    {
        public const int CpfMaxLength = 11;
        public string Number { get; private set; }

        //Construtor do EntityFramework
        protected Cpf() { }

        public Cpf(string number)
        {
            if (!Validate(number)) throw new DomainException("CPF inválido");
            Number = number;
        }

        public static bool Validate(string cpf)
        {
            cpf = cpf.JustNumbers();

            if (cpf.Length > 11)
                return false;

            while (cpf.Length != 11)
                cpf = '0' + cpf;

            var equal = true;
            for (var i = 1; i < 11 && equal; i++)
                if (cpf[i] != cpf[0])
                    equal = false;

            if (equal || cpf == "12345678909")
                return false;

            var number = new int[11];

            for (var i = 0; i < 11; i++)
                number[i] = int.Parse(cpf[i].ToString());

            var sum = 0;
            for (var i = 0; i < 9; i++)
                sum += (10 - i) * number[i];

            var result = sum % 11;

            if (result == 1 || result == 0)
            {
                if (number[9] != 0)
                    return false;
            }
            else if (number[9] != 11 - result)
                return false;

            sum = 0;
            for (var i = 0; i < 10; i++)
                sum += (11 - i) * number[i];

            result = sum % 11;

            if (result == 1 || result == 0)
            {
                if (number[10] != 0)
                    return false;
            }
            else if (number[10] != 11 - result)
                return false;

            return true;
        }
    }
}