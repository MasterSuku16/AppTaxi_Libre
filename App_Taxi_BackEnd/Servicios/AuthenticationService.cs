using App_Taxi_BackEnd.Models;
using Google.Cloud.Firestore;
using System.Linq;

using Firebase.Auth;
using Firebase.Storage;

namespace App_Taxi_BackEnd.Servicios
{
    public class AuthenticationService
    {
        FirestoreDb db = FirestoreDb.Create("test4-netcore");
        private readonly Utilities _Utilities;

        public AuthenticationService(Utilities utilities)
        {
            _Utilities = utilities;
        }
        //LOGIN
        internal async Task<Result>Login(string username, string password)
        {
            var document = db.Collection("Users").WhereEqualTo("Email", username).WhereEqualTo("Password", password).GetSnapshotAsync().Result.FirstOrDefault();
            if (document == null)
                return new Result() { Title = "Hay un problema con informacion", Type = ResultType.warning };
            return new Result() { Title = "Sesion iniciada correctamente", Data = document.ConvertTo<Models.User>(), Type = ResultType.success };
        }

        //REGISTRO
        internal async Task<Result> Register(Models.RegisterDTO data)
        {
            //REGISTRAR NUEVO USUARIO
             var user = data.ToUser();
            var userDocument = db.Collection("Users").WhereEqualTo("Email", user.Email).GetSnapshotAsync().Result.FirstOrDefault();
            if (userDocument != null)
                return new Result() { Title = "Ese correo ya esta registrado en nuestro sistema", Type = ResultType.warning };
            var newUserDocument = await db.Collection("Users").AddAsync(user);

            //GUARDAR FOTO DE PERFIL
            //user.Image = await _Utilities.SaveFile(newFile, newUserDocument.Id, "PhotoProfile");
            //if (user.Image == "")
             //   return new Result() { Title = "Hubo un problema con la imagen, revisa el tamaño o formato", Type = ResultType.error };

            //db.Collection("Users").Document(newUserDocument.Id)
            //var ImageUpdate = await db.Collection("Users").Document(newUserDocument.Id).UpdateAsync();
            //--------------------si debe de ir--------------
            // await db.Collection("Users").Document(newUserDocument.Id).UpdateAsync("Image", user.Image);
            //----------------------------------------------------------
            //await db.Collection("Users").Document(newUserDocument.Id).UpdateAsync(user);
            // You can also update a single field with: await cityRef.UpdateAsync("Capital", false);

            return new Result() { Title = "Registro exitosamente", Data = newUserDocument.Id, Type = ResultType.success };
        }
    }

}
