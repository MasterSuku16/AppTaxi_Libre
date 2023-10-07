using App_Taxi_BackEnd.Models;
using Firebase.Auth;
using Firebase.Storage;

namespace App_Taxi_BackEnd.Servicios
{
    public class Utilities
    {
        //string email = "isaacgalindobag@gmail.com";
        //string clave = "10marzo2002";
        //string ruta = "test4-netcore.appspot.com";
        //string api_key = "AIzaSyCkHYg3MYMnCO19NQjTnv4q8FRz2EcWwpc";

        //GUARDAR ARCHIVO
        //public async Task<string> SaveFile(IFormFile fileToSave, string idUser, string fileName)
        ////public async Task<string> UpdateFile(IFormFile fileToSave, string idUser,string fileName)
        //{
        //    //CREAN LOS TOKENS DE AUTHENTICACION
        //    var auth = new FirebaseAuthProvider(new FirebaseConfig(api_key));
        //    var a = await auth.SignInWithEmailAndPasswordAsync(email, clave);
        //    var cancellation = new CancellationTokenSource();

        //    //CONVERTIR EL FORM FILE TO STREAM Y RESETAR POSICION A 0 Y OBTENER EXTENSIOn
        //    var ms = new MemoryStream();
        //    fileToSave.CopyTo(ms);
        //    ms.Position = 0;//ES IMPORTANTE O NO FUNCIONA E FIREBASE PUT ASYNC
        //    string strFileExtension = System.IO.Path.GetExtension(fileToSave.FileName);

        //    //OPCIONES DE FIREBASE STORAGE
        //    var options = new FirebaseStorageOptions
        //    {
        //        AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
        //        ThrowOnCancel = true
        //    };
        //    //SALVAR ARCHIVO Y REGRESAR URL
        //    var task = new FirebaseStorage(ruta, options).Child("IdUser").Child(idUser).Child(fileName + "."+ strFileExtension).PutAsync(ms, cancellation.Token);
        //    var downloadURL = await task;
        //    return await task;
        //}

        public async Task<string> UploadFileToStorage(IFormFile archivo, string nombre, string folder)
        {
            //INGRESA AQUÍ TUS PROPIAS CREDENCIALES
            string email = "isaacgalindobag@gmail.com";
            string clave = "10marzo2002";
            string ruta = "test4-netcore.appspot.com";
            string api_key = "AIzaSyCkHYg3MYMnCO19NQjTnv4q8FRz2EcWwpc";

            var ms = new MemoryStream();
            archivo.CopyTo(ms);
            ms.Position = 0;

            var auth = new FirebaseAuthProvider(new FirebaseConfig(api_key));
            var a = await auth.SignInWithEmailAndPasswordAsync(email, clave);
            var cancellation = new CancellationTokenSource();
            var task = new FirebaseStorage(
                ruta,
                new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                    ThrowOnCancel = true
                })
                .Child(folder).Child(nombre).PutAsync(ms, cancellation.Token);
            var downloadURL = await task;
            return downloadURL;
        }
    }
}
