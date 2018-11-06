using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace PasswordUtilityApp
{
    public class EncryptPassword
    {
        CTSDBContext _dbContext = new CTSDBContext();
        public EncryptPassword()
        {

        }

        public void DoWork()
        {
            Console.WriteLine("Encrypting Password");

            List<CTSUser> users = _dbContext.CTSUsers.ToList();
            foreach ( CTSUser user in users)
            {
                Console.WriteLine(user.Id);
                byte[] hash = GetHash();
                string hashedPassword = GetPassword("velkome@1", hash);
                Console.WriteLine($"Hashed Password {hashedPassword}");
                SqlParameter[] sqlParams = GetParameters(user.Id, hashedPassword, hash);
                _dbContext.Database.ExecuteSqlCommand("EXEC SAVE_CTSUSERCRED @CTSUserID, @Password, @Hash, @Locked, @LastLogin, @Result, @Error", sqlParams);
            }
        }

        private SqlParameter[] GetParameters(int id, string hashedPassword, byte[] hash)
        {
            SqlParameter[] sqlParams = new SqlParameter[7];

            sqlParams[0] = new SqlParameter();
            sqlParams[0].SqlDbType = System.Data.SqlDbType.Int;
            sqlParams[0].ParameterName = "@CTSUserID";
            sqlParams[0].Value = id;

            sqlParams[1] = new SqlParameter();
            sqlParams[1].SqlDbType = System.Data.SqlDbType.VarChar;
            sqlParams[1].ParameterName = "@Password";
            sqlParams[1].Value = hashedPassword;

            sqlParams[2] = new SqlParameter();
            sqlParams[1].SqlDbType = System.Data.SqlDbType.VarChar;
            sqlParams[2].ParameterName = "@Hash";
            sqlParams[2].Value = Convert.ToBase64String(hash);

            sqlParams[3] = new SqlParameter();
            sqlParams[1].SqlDbType = System.Data.SqlDbType.VarChar;
            sqlParams[3].ParameterName = "@Locked";
            sqlParams[3].Value = "N";

            sqlParams[4] = new SqlParameter();
            sqlParams[4].SqlDbType = System.Data.SqlDbType.DateTime;
            sqlParams[4].ParameterName = "@LastLogin";
            sqlParams[4].Value = DateTime.Now;

            sqlParams[5] = new SqlParameter();
            sqlParams[5].SqlDbType = System.Data.SqlDbType.Int;
            sqlParams[5].ParameterName = "@Result";
            sqlParams[5].Direction = System.Data.ParameterDirection.Output;

            sqlParams[6] = new SqlParameter();
            sqlParams[1].SqlDbType = System.Data.SqlDbType.VarChar;
            sqlParams[6].ParameterName = "@Error";
            sqlParams[6].Size = 100;
            sqlParams[6].Direction = System.Data.ParameterDirection.Output;

            return sqlParams;
        }

        private byte[] GetHash()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            string saltString = Convert.ToBase64String(salt);
            Console.WriteLine($"Salt: {saltString}");
            return salt;
           
        }

        private string GetPassword(string password, byte[] salt)
        {
            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashed;
        }
    }
}
