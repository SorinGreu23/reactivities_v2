using FluentValidation;

namespace Reactivities.Application.Profiles
{
    public class ProfileValidator : AbstractValidator<Profile>
    {
        public ProfileValidator()
        {
            RuleFor(p => p.DisplayName).NotEmpty();
        }
    }
}
