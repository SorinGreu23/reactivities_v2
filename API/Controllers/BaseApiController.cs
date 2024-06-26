using MediatR;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Core;
using System.Runtime.CompilerServices;

namespace Reactivities.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= 
            HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();

            if (!result.HasErrors && result.Value != null)
            {
                return Ok(result.Value);
            }

            if (!result.HasErrors && result.Value == null)
            {
                return NotFound();
            }

            return BadRequest(result.ErrorMessage);
        }
    }
}
