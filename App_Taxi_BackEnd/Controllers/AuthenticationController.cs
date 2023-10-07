using App_Taxi_BackEnd.Models;
using App_Taxi_BackEnd.Servicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Firebase.Auth;

//USIG DE GIT
using System;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Firebase.Storage;
using System.Net.Http.Headers;

namespace App_Taxi_BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthenticationService _AuthenticationService;
        private readonly Utilities _Utilities;
        private readonly ILogger<UsersController> _logger;

        public AuthenticationController(ILogger<UsersController> logger, AuthenticationService authenticationService, Utilities utilities)
        {
            _AuthenticationService = authenticationService;
            _logger = logger;
            _Utilities = utilities;
        }

        //inicio de sesion
        [HttpPost]
        [Route("Login")]
        public async Task<Result> Login(string username, string password)
        {
            return await _AuthenticationService.Login(username, password);
        }
        //registro
        [HttpPost]
        [Route("Register")]
        public async Task<Result> Register([FromBody] Models.RegisterDTO registerData)
        {
            return await _AuthenticationService.Register(registerData);
        }

        //imagen correcta
        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadProfilePhoto")]
        public async Task<Result> UploadProfilePhoto()
        {
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();
            var extension = file.FileName.Split(".")[1];
            var nombre_of_file = Guid.NewGuid().ToString() + "," + extension;
            var URL = await _Utilities.UploadFileToStorage(file, nombre_of_file, "PictureProfile");
            return new Result()
            {
                Data=URL,
                Message="imagen subida exitosamente"
            };
        }

        //[HttpPost, DisableRequestSizeLimit]
        //[Route("Upload")]
        //public async Task<IActionResult> Upload()
        //{
        //    try
        //    {
        //        var formCollection = await Request.ReadFormAsync();
        //        var file = formCollection.Files.First();

        //        var folderName = Path.Combine("Resources", "Images");
        //        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
        //        if (file.Length > 0)
        //        {
        //            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //            var fullPath = Path.Combine(pathToSave, fileName);
        //            var dbPath = Path.Combine(folderName, fileName);
        //            using (var stream = new FileStream(fullPath, FileMode.Create))
        //            {
        //                file.CopyTo(stream);
        //            }
        //            return Ok(new { dbPath });
        //        }
        //        else
        //        {
        //            return BadRequest();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex}");
        //    }
        //}

        //subir la imagen a localstorage
        [HttpPost]
        [Route("UploadStorage")]
        public async Task<string> UploadStorage(IFormFile archivo, string nombre, string folder)
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
        
        



