import { StockRankClientPage } from './app.po';

describe('stock-rank-client App', () => {
  let page: StockRankClientPage;

  beforeEach(() => {
    page = new StockRankClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
