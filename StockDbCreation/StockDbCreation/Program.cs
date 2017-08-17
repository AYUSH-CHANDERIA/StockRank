using MongoDB.Bson;
using MongoDB.Driver;
using StockDbCreation.Model;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StockDbCreation
{
    public class Program
    {
        private static string BASE_PATH = AppContext.BaseDirectory + "/RawData";
        public static void Main(string[] args)
        {
            // CreateIndexes(new StockDbContext());
            //return;
            Console.WriteLine("Application Started!!!");
            try
            {
                CreateDatabase();
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        private static void CreateDatabase()
        {
            string bseCompanyDataFilePath = Path.Combine(BASE_PATH, "BseActiveCompanyList.txt");

            string[] data = File.ReadAllLines(bseCompanyDataFilePath);
            Dictionary<int, string> bse_nse_map, bse_mc_map;
            GetBseNseMCHiddenIdMap(out bse_nse_map, out bse_mc_map);
            StockDbContext context = new StockDbContext();

            foreach (string s in data)
            {
                string[] ar = s.Split(',');

                string bseLink = ar[0].Trim();
                int bseId = int.Parse(ar[1]);
                
                string nseId = bse_nse_map.ContainsKey(bseId) ? bse_nse_map[bseId] : "";
                string stockName = ar[3].Trim();
                string bse_category = ar[5].Trim();
                double face_value = double.Parse(ar[6]);
                string Isin = ar[7].Trim();
                string industry = ar[8].Trim();

                Price[] bseHistory = new Price[0],
                    nseHistory = new Price[0];

                if (bse_mc_map.ContainsKey(bseId))
                    GetHistory(bse_mc_map[bseId], out bseHistory, out nseHistory);
                else
                    Console.Write("NO Mc Id found for " + bseId + " " + stockName);

                FundamentalData fundamentalData = new FundamentalData() { BSECategory = bse_category, BSEIndustry = industry, FaceValue = face_value, MarketCap = 0.0 };
                Stock stock = new Stock() { BseId = bseId, NseId = nseId, Isin = Isin, Name = stockName, BseStockLink = bseLink, FundaMentalData = fundamentalData, BsePriceHistory = bseHistory, NsePriceHistory = nseHistory };
                context.Stock.InsertOne(stock);
                Console.WriteLine(stockName);
            }
        }

        private static void GetHistory(string mcHiddenId, out Price[] bseHistory, out Price[] nseHistory)
        {
            string bseHistroyFile = Path.Combine(BASE_PATH, "BSE_History", mcHiddenId.ToLower() + ".csv");
            string nseHistoryFile = Path.Combine(BASE_PATH, "NSE_History", mcHiddenId.ToLower() + ".csv");

            bseHistory = new Price[0];
            nseHistory = new Price[0];

            var bList = new List<Price>();
            var nList = new List<Price>();

            if (File.Exists(bseHistroyFile))
            {
                string[] bseRawData = File.ReadAllLines(bseHistroyFile);
                foreach (var row in bseRawData)
                {
                    Price p = GetPriceFromRawData(row);
                    bList.Add(p);
                }
            }

            if (File.Exists(nseHistoryFile))
            {
                string[] nseRawData = File.ReadAllLines(nseHistoryFile);
                foreach (var row in nseRawData)
                {
                    Price p = GetPriceFromRawData(row);
                    nList.Add(p);
                }
            }

            bseHistory = bList.ToArray();
            nseHistory = nList.ToArray();
        }

        private static Price GetPriceFromRawData(string rawData)
        {
            string[] ar = rawData.Split(',');
            if (ar.Length < 6)
                return null;

            DateTime dt;
            DateTime.TryParse(ar[0], CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out dt);

            double open, high, low, close;
            int volume;
            string notes;
            open = double.Parse(ar[1]);
            high = double.Parse(ar[2]);
            low = double.Parse(ar[3]);
            close = double.Parse(ar[4]);
            volume = int.Parse(ar[5]);
            notes = ar[ar.Length - 1];

            Price p = new Price() { Close = close, Open = open, High = high, Date = dt, Delivery = 0, Low = low, Note = notes, Volume = volume };
            return p;
        }

        private static void GetBseNseMCHiddenIdMap(out Dictionary<int, string> bseNseMap, out Dictionary<int, string> bseMcMap)
        {
            string bseNseMapFilePath = Path.Combine(BASE_PATH, "BSE_NSE_MC_Map.txt");
            bseNseMap = new Dictionary<int, string>();
            bseMcMap = new Dictionary<int, string>();

            string[] data = File.ReadAllLines(bseNseMapFilePath);
            foreach (string s in data)
            {
                int bseId = 0;
                string nseId = "";
                string mcHiddentId = "";
                string[] ar = s.Split(',');
                if (ar.Length < 2) continue;

                if (int.TryParse(ar[0].Trim(), out bseId))
                {
                    nseId = ar[1].Trim();
                    mcHiddentId = ar[2].Trim();
                    if (nseId.Length > 0)
                        bseNseMap[bseId] = nseId.Trim();

                    if (mcHiddentId.Length > 0)
                        bseMcMap[bseId] = mcHiddentId.Trim();
                }
            }
        }

        private static void CreateIndexes(StockDbContext context)
        {
            context.Stock.Indexes.CreateOne(Builders<Stock>.IndexKeys.Ascending(x => x.BseId));
            context.Stock.Indexes.CreateOne(Builders<Stock>.IndexKeys.Ascending(x => x.NseId));

            // TODO: Run below commands manually
            // db.Stock.createIndex({ "BsePriceHistory.Date": -1})
            // db.Stock.createIndex({ "NsePriceHistory.Date": -1})
        }
    }
}