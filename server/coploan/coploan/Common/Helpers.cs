using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coploan.Common
{
    public class Helpers
    {
        public static bool isEmpty(object obj)
        {
            bool isEmpty = false;
            if (obj is null)
            {
                isEmpty = true;
            }
            else if (String.IsNullOrEmpty(obj.ToString()))
            {
                isEmpty = true;
            }
            return isEmpty;
        }
    }
}
