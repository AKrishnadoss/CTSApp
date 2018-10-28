using System;
using System.Collections.Generic;
using System.Text;

namespace PasswordUtilityApp
{
    public class TokenKeyGenerator
    {
        public TokenKeyGenerator()
        {

        }

        public void DoWork()
        {
            var hmac = new System.Security.Cryptography.HMACSHA256();
            string secret = Convert.ToBase64String(hmac.Key);
            Console.WriteLine($"TokenKey = '{secret}'");
        }
    }
}
