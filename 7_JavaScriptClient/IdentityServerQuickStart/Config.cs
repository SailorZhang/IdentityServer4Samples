using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IdentityServerQuickStart
{
    public class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1","My API")
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId="js",
                    ClientName = "JS Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    //ClientSecrets =
                    //{
                    //    new Secret("secret".Sha256())
                    //},
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris = { "http://localhost:9091/"},
                    PostLogoutRedirectUris = { "http://localhost:9091/signout" },
                    AllowedCorsOrigins = { "http://localhost:9091" },
                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "api1"
                    }
                },
                new Client
                {
                    ClientId="sailor",
                    ClientName = "sailor Client",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets =
                    {
                        new Secret("sailor".Sha256())
                    },
                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "api1"
                    }
                }
            };
        }

        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "sailor",
                    Password="sailor",
                    Claims = new []
                    {
                        new Claim("name", "Sailor"),
                        new Claim("website", "https://sailor.com")
                    }
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "gins",
                    Password="gins"
                },
                new TestUser
                {
                    SubjectId = "3",
                    Username = "cathy",
                    Password="cathy"
                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }
    }
}