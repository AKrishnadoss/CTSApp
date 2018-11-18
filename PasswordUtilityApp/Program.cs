using System;

namespace PasswordUtilityApp
{
    class Program
    {
        static void Main(string[] args)
        {
            EncryptPassword instance = new EncryptPassword();
            //TokenKeyGenerator instance = new TokenKeyGenerator();
            instance.DoWork();
        }
    }
}
