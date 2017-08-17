import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StockSearchEntry } from './stock-search.model';
import { StockDetailData } from './stock-detail.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class StockDataService {

    baseUrl = "http://stockrank.in/api/";
    searchUrl: string;
   // _dummyDataProvider: DummyStockDataProvider;
    constructor(private http: Http) {
     //     this._dummyDataProvider = new DummyStockDataProvider();
        this.searchUrl = this.baseUrl + "search/";
    }

    searchStock(searchStr: string): Observable<StockSearchEntry[]> {
       // return Observable.fromPromise<StockSearchEntry[]>(this._dummyDataProvider.getTickersAsync(searchStr));
        var str = this.searchUrl + "/" + searchStr;
        return this.http.get(str)
            .map((res: Response) => { 
                var entry1: StockSearchEntry = new StockSearchEntry();
                entry1.Id = "500037";
                entry1.Name = "Infosys";
                
                let entries: StockSearchEntry[] = [];
                entries.push(entry1);
              //  console.log(entries);
                return entries;

                //  var entries: StockSearchEntry[] = res.json() as StockSearchEntry[];
                //  console.log(res.json());
                //  console.log(entries);
                // return entries;
            })
            .catch((error: any) => {
                console.log(error);
                return Observable.throw('Server error');
            });
    }

    getStockDetailData(ticker: string): Observable<StockDetailData> {
        //return this._dummyDataProvider.getStockDataAsync(ticker);
        // TODO change it later
        let detailUrl = this.baseUrl + "stock/" + ticker;
        return this.http.get(detailUrl)
            .map((res: Response) => {
                var stockData: StockDetailData = <StockDetailData>res.json();
                var dataLength: number = stockData.HistoricData.length;
                var groupingUnits = [[
                    'week',                         // unit name
                    [1]                             // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]];

                var i = 0;
                return stockData;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error in getting stock details.'));
    }
}

// Remove this data provider after implementation of http service.
class DummyStockDataProvider {
    allStocks = [
        { name: "TCS", ticker: "TCS" },
        { name: "Tata Consultancy Services", ticker: "TCS" },
        { name: "Infosys Technologies", ticker: "Infosys" },
        { name: "Reliance Industries", ticker: "Reliance" },
        { name: "ITC", ticker: "ITC" },
        { name: "Indian Tobaco Company", ticker: "ITC" },
        { name: "Hindustan Unilever Limited", ticker: "HUL" },
        { name: "HUL", ticker: "HUL" },
        { name: "HDIL", ticker: "HDIL" },
        { name: "Wipro", ticker: "Wipro" },
        { name: "Larson and Tourbo", ticker: "LT" },
        { name: "ICICI Bank", ticker: "ICICI" },
        { name: "Syngene International", ticker: "Syngene" }
    ];

    getTickers(search: string): StockSearchEntry[] {
        return this.allStocks.filter(str =>
            (str.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
            (str.ticker.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        ).map<StockSearchEntry>(c => {
            console.log({ Id: c.ticker, Name: c.name })
            return { Id: c.ticker, Name: c.name };
        }
            );
    }

    getTickersAsync(search: string) {
        return new Promise<StockSearchEntry[]>((resolve, reject) => {
            setTimeout(() => resolve(this.getTickers(search)), 0);
        });
    }

    getStockDataAsync(ticker: string) {
        return new Promise<StockDetailData>((resolve, reject) => {
            setTimeout(() => {
                let data: StockDetailData = new StockDetailData();
                if (ticker.toLowerCase() === "tcs") {
                    data.Name = "Tata Consultancy Services";
                }
                else {
                    data.Name = "Some Other Company";
                }
                resolve(data);
            })
        });
    }
}