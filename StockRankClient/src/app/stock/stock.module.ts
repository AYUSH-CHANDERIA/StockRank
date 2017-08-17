import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { SearchBoxComponent } from './shared/search-box/search-box.component';
import { StockDataService } from './shared/stock-data.service';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
export function highchartsFactory() {
  return require('highcharts/highstock');
}

@NgModule({
  imports: [Ng2AutoCompleteModule, ChartModule],
  exports: [SearchBoxComponent],
  declarations: [HomeComponent, SearchBoxComponent, StockDetailsComponent, StockChartComponent],
  providers: [StockDataService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }]
})
export class StockModule { }
