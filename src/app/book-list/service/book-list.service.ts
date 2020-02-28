import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {share} from "rxjs/operators";


@Injectable()
export class BookListService {
  constructor(private _httpClient: HttpClient) {
  }

  getBookList(pageIndex:any, pageSize:any): Observable<any> {
    return this._httpClient.post("mvc/books/loadBookList", {}).pipe(share());
  }
}
