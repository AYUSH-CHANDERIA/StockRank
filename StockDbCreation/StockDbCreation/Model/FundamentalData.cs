using System;
using System.Collections.Generic;
using System.Text;

namespace StockDbCreation.Model
{
    public class FundamentalData
    {
        public double MarketCap { get; set; }

        public double FaceValue { get; set; }

        public string BSEIndustry { get; set; }

        public string BSECategory { get; set; }
    }
}
