using App_Taxi_BackEnd.Models;
using App_Taxi_BackEnd.Servicios;
using Microsoft.AspNetCore.Mvc;

namespace App_Taxi_BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersServices _UsersService;
        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger, UsersServices userServices)
        {
            _UsersService = userServices;
            _logger = logger;
        }

        [HttpGet]
        [Route("GetAllUsersAsync")]
        public async Task<List<RegisterDTO>> GetAllUsersAsync()
        {
            return await _UsersService.GetAllUsersAsync();
        }


        [HttpPost]
        [Route("CreateUserAsync")]
        public async Task<Result> CreateUserAsync([FromBody] RegisterDTO user)
        {
            return await _UsersService.CreateUserAsync(user);
        }

        [HttpGet]
        [Route("TEST")]
        public async Task<string> TEST()
        {
            return  await  _UsersService.test();
        }

        //[HttpPost]
        //[Route("CreateUserAsync")]
        //public async Task<IActionResult> CreateUserAsync([FromBody] User user)
        //{
        //    await _UsersService.CreateUserAsync(user);
        //    return CreatedAtAction(nameof(GetAllUsersAsync), new { id = user.Id }, user);
        //}

        //[HttpPost]
        //[Route("UpdateUserAsync")]
        //public async Task<IActionResult> UpdateUserAsync([FromBody] User user)
        //{
        //    await _UsersService.UpdateUserAsync(user);
        //    return CreatedAtAction(nameof(GetAllUsersAsync), new { id = user.Id }, user);
        //}
        //[HttpPost]
        //[Route("DeleteUserAsync")]
        //public async Task<string> DeleteUserAsync(string id)
        //{
        //    await _UsersService.DeleteUserAsync(id);
        //    return "Exito";
        //}



        //[HttpGet(Name = "GetAllUsers")]
        //public async Task<List<User>>  GetAllUsers()
        //{
        //    return await _usersServices.GetAllUsersAsync();
        //}

        ////[HttpGet(Name = "GetSingleUser")]
        //[HttpGet("getSingleUser", Name = "GetSingleUser")]
        //public User GetSingleUser()
        //{
        //    return Enumerable.Range(1, 5).Select(index => new User
        //    {
        //        Id = Random.Shared.Next(50).ToString(),
        //        Name = Summaries[Random.Shared.Next(Summaries.Length)],
        //        NickName = "",
        //        Password = ""
        //    }).First();
        //}
    }
}