import { CryptoGraph } from './crypto-graph';
import { HttpClient } from '@angular/common/http';

describe('CryptoGraph', () => {
  let cryptoGraph: CryptoGraph;
  let httpMock: HttpClient;

  beforeEach(() => {
    httpMock = {} as HttpClient; // mock simple
    cryptoGraph = new CryptoGraph(httpMock);
  });

  it('should create', () => {
    expect(cryptoGraph).toBeTruthy();
  });
});
