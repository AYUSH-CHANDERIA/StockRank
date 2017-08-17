import { Component, OnInit, Input } from '@angular/core';
import { StockDetailData } from '../shared/stock-detail.model';
import {Http} from '@angular/http';

@Component({
  selector: 'stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit {
  constructor(private http: Http) {
  }
  options: Object;

  @Input() stockData: StockDetailData;

  ngOnInit() {
  }

  SetStockDetailsData(newData: StockDetailData) {
    this.stockData = newData;
    var ohlc: number[][] = [];
    var volume: number[][] = [];
    var dataLength: number = this.stockData.HistoricData.length;
   
    var i = 0;

    for (i = 0; i < dataLength; i += 1) {
      ohlc.push([
        +this.stockData.HistoricData[i][0], // the date
        // +this.stockData.HistoricData[i][1], // open
        // +this.stockData.HistoricData[i][2], // high
        // +this.stockData.HistoricData[i][3], // low
        +this.stockData.HistoricData[i][4] // close
      ]);

      volume.push([
        +this.stockData.HistoricData[i][0], // the date
        +this.stockData.HistoricData[i][5] // the volume
      ]);
    }

    this.options = {
      chart: {
        height: 600,
        backgroundColor: '#F3F9FE'
      },

      rangeSelector: {
        selected: 1
      },

      // title: {
      //   text: this.stockData.Name + " Data"
      // },

      yAxis: [{
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Price'
        },
        height: '60%',
        lineWidth: 2
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],

      tooltip: {
        split: false,
        valueDecimals: 2
      },

      series: [{
        name: 'Price',
        data: ohlc,
        shadow: false,
      }, {
        type: 'column',
        name: 'Volume',
        data: volume,
        yAxis: 1,
        shadow: false,
         tooltip: {
        valueDecimals: 0
      }
      }]
    };
  }
}