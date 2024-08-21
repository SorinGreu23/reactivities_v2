using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Reactivities.Application.Activities;
using Reactivities.Application.Core;
using Reactivities.Application.Interfaces;
using Reactivities.Infrastructure.Photos;
using Reactivities.Infrastructure.Security;
using Reactivities.Persistence;

namespace Reactivities.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(options => {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials()
                          .WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(config =>
            {
                config.RegisterServicesFromAssembly(typeof(List.Handler).Assembly);
            });
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddSignalR();

            return services;
        }
    }
}
