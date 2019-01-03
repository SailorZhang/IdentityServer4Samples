using IdentityModel;
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
                new ApiResource("minile_api","MiniLE API",new List<string>(){"email" ,"given_name", "open_id"})
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            //var customProfile = new IdentityResource(
            //       name: "custom.profile",
            //       displayName: "Custom profile",
            //       claimTypes: new[] { "email", "given_name", "open_id" });
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                //customProfile
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId="ro.client",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    ClientSecrets =
                    {
                        new Secret("123456".Sha256())
                    },
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "minile_api"
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
                    Claims = {
                        new Claim("given_name","SailorZhang"),
                        new Claim("email","xiangnan.zhang@accenture.com"),
                        new Claim("open_id","123456"),
                    }
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "gins",
                    Password="gins",
                    Claims = {
                        new Claim("given_name","GinsZhang"),
                        new Claim("email","wei.g.zhang@accenture.com"),
                        new Claim("open_id","654321"),
                    }
                },
                new TestUser
                {
                    SubjectId = "3",
                    Username = "cathy",
                    Password="cathy",
                    Claims = {
                        new Claim("given_name","CathyYuan"),
                        new Claim("email","shaojie.yuan@accenture.com"),
                        new Claim("open_id","789789"),
                    }
                }
            };
        }
    }
}