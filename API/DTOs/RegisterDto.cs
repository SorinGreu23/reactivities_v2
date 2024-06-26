﻿using System.ComponentModel.DataAnnotations;

namespace Reactivities.API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

        [Required]
        public string UserName { get; set; }
    }
}
