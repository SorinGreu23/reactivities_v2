using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Application.Core
{
    public class Result<T>
    {
        public bool HasErrors { get; set; }
        public T Value { get; set; }
        public string ErrorMessage { get; set; }
        public static Result<T> Ok(T value) => new Result<T> { HasErrors = false, Value = value };
        public static Result<T> Error(string error) => new Result<T> { HasErrors = true, ErrorMessage = error };
    }
}
