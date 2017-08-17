using System;
using System.Collections.Generic;
using System.Text;

namespace StockDbCreation.Model
{
    public class Price
    {
        public DateTime Date { get; set; }

        public double Open { get; set; }

        public double High { get; set; }

        public double Low { get; set; }

        public double Close { get; set; }

        public int Volume { get; set; }

        public int Delivery { get; set; }

        public string Note { get; set; }
    }
}
