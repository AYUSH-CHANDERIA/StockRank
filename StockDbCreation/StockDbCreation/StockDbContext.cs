using MongoDB.Driver;
using StockDbCreation.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockDbCreation
{
    public class StockDbContext
    {
        public const string CONNECTION_STRING = "mongodb://localhost:27017";
        public const string DB_NAME = "StockDb";
        public const string STOCK_COLLECTION_NAME = "Stock";

        private static readonly IMongoClient _client;

        private static readonly IMongoDatabase _database;

        static StockDbContext()
        {
            _client = new MongoClient(CONNECTION_STRING);
            _database = _client.GetDatabase(DB_NAME);
        }

        public IMongoClient Client
        {
            get { return _client; }
        }

        public IMongoCollection<Stock> Stock
        {
            get { return _database.GetCollection<Stock>(STOCK_COLLECTION_NAME); }
        }

        public IMongoDatabase Database
        {
            get { return _database; }
        }
    }
}
