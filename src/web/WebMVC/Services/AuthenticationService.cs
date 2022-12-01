using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Options;
using NS.APICore.Identity;
using NS.APICore.User;
using NS.Core.Communication;
using NS.WebMVC.Models;

namespace NS.WebMVC.Services
{
    public interface IAuthenticationsService
    {
        Task<UserResponseLogin> Login(UserLogin userLogin);

        Task<UserResponseLogin> Register(UserRegister userRegister);

        Task SignIn(UserResponseLogin response);
        Task Logout();

        bool TokenExpiration();

        Task<bool> RefreshTokenValid();
    }

    public class AuthenticationService : Service, IAuthenticationsService
    {
        private readonly HttpClient _httpClient;

        private readonly IAspNetUser _user;
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationService(HttpClient httpClient, 
                                   IOptions<AppSettings> settings, 
                                   IAspNetUser user, 
                                   IAuthenticationService authenticationService)
        {
            httpClient.BaseAddress = new Uri(settings.Value.AutenticationJwksUrl);

            _httpClient = httpClient;
            _user = user;
            _authenticationService = authenticationService;
        }

        public async Task<UserResponseLogin> Login(UserLogin userLogin)
        {
            var loginContent = GetContent(userLogin);

            var response = await _httpClient.PostAsync("/api/identidade/autenticar", loginContent);

            if (!HandleErrosResponse(response))
            {
                return new UserResponseLogin
                {
                    ResponseResult = await DeserializarObjetoResponse<ResponseResult>(response)
                };
            }

            return await DeserializarObjetoResponse<UserResponseLogin>(response);
        }

        public async Task<UserResponseLogin> Register(UserRegister userRegister)
        {
            var registerContent = GetContent(userRegister);

            var response = await _httpClient.PostAsync("/api/identidade/nova-conta", registerContent);

            if (!HandleErrosResponse(response))
            {
                return new UserResponseLogin
                {
                    ResponseResult = await DeserializarObjetoResponse<ResponseResult>(response)
                };
            }

            return await DeserializarObjetoResponse<UserResponseLogin>(response);
        }

        public async Task<UserResponseLogin> UseRefreshToken(string refreshToken)
        {
            var refreshTokenContent = GetContent(refreshToken);

            var response = await _httpClient.PostAsync("/api/identidade/refresh-token", refreshTokenContent);

            if (!HandleErrosResponse(response))
            {
                return new UserResponseLogin
                {
                    ResponseResult = await DeserializarObjetoResponse<ResponseResult>(response)
                };
            }

            return await DeserializarObjetoResponse<UserResponseLogin>(response);
        }

        public async Task SignIn(UserResponseLogin response)
        {
            var token = GetTokenFormated(response.AccessToken);

            var claims = new List<Claim>();
            claims.Add(new Claim("JWT", response.AccessToken));
            claims.Add(new Claim("RefreshToken", response.RefreshToken));
            claims.AddRange(token.Claims);

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                ExpiresUtc = DateTimeOffset.UtcNow.AddHours(8),
                IsPersistent = true
            };

            await _authenticationService.SignInAsync(
                _user.ObterHttpContext(),
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
        }

        public async Task Logout()
        {
            await _authenticationService.SignOutAsync(
                _user.ObterHttpContext(),
                CookieAuthenticationDefaults.AuthenticationScheme,
                null);
        }

        public static JwtSecurityToken GetTokenFormated(string jwtToken)
        {
            return new JwtSecurityTokenHandler().ReadToken(jwtToken) as JwtSecurityToken;
        }

        public bool TokenExpiration()
        {
            var jwt = _user.ObterUserToken();
            if (jwt is null) return false;

            var token = GetTokenFormated(jwt);
            return token.ValidTo.ToLocalTime() < DateTime.Now;
        }

        public async Task<bool> RefreshTokenValid()
        {
            var resposta = await UseRefreshToken(_user.ObterUserRefreshToken());

            if (resposta.AccessToken != null && resposta.ResponseResult == null)
            {
                await SignIn(resposta);
                return true;
            }

            return false;
        }
    }
}
