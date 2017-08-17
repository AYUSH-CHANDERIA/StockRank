using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace StockDbCreation.Model
{
    public class Stock
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public int BseId { get; set; }

        public string NseId { get; set; }

        public string Isin { get; set; }

        public string BseStockLink { get; set; }

        public FundamentalData FundaMentalData { get; set; }

        public Price[] BsePriceHistory { get; set; }

        public Price[] NsePriceHistory { get; set; }
    }
}
