import { StockDataService } from '../shared/stock-data.service';
import { StockDetailData } from '../shared/stock-detail.model';

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StockChartComponent } from '../stock-chart/stock-chart.component';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit, OnDestroy {

  _stockDetailsData: StockDetailData;
  _subscription: Subscription;
  @ViewChild(StockChartComponent) stockChartComponent: StockChartComponent;

  constructor(private _route: ActivatedRoute, private _router: Router, private _stockDataService: StockDataService) {
    // Set dummy data to StockDetailData.
    this._stockDetailsData = new StockDetailData();
  }

  ngOnInit(): void {
    this._subscription = this._route.params.subscribe(p => {
      let id: string = p['id'];

      this._stockDataService.getStockDetailData(id).subscribe(
        data => {
          this._stockDetailsData = data;
          console.log(this._stockDetailsData);
          this.stockChartComponent.SetStockDetailsData(data);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}