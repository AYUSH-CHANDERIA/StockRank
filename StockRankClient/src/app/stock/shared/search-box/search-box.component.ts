import { Component, OnInit } from '@angular/core';
import { StockDataService } from '../stock-data.service';
import { StockSearchEntry } from '../stock-search.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'sw-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  model1 = "";
  stockDataServiceUrl: string = "http://stockrank.in/api/search/:keyword";

  constructor(private _stockDataService: StockDataService, private _router: Router) {
  }

  ngOnInit() {
  }

  stockSelected(newVal) {
    let ent: StockSearchEntry = <StockSearchEntry>newVal;
    if (ent && ent.Id) {
      console.log("value is changed to ", newVal);
      this._router.navigate(['stock', ent.Id])
    }
  }
}