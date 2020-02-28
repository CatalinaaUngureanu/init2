import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {BookListService} from "./service/book-list.service";
import {takeUntil, tap} from "rxjs/operators";
import {UnsubscribeCapableComponent} from "../unsubscribe-capable.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'book-list',
  templateUrl: 'book-list.component.html',
  providers: [BookListService]
})
export class BookListComponent extends UnsubscribeCapableComponent implements OnInit{
  dataSource;
  isLoading = true;
  tableColumns = ['name', 'description'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private bookListService: BookListService, private cdr: ChangeDetectorRef) {
    super();
  }

  /*setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;

    if (this.paginator) {
      this.applyFilter('');
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }*/
  /*@ViewChild(MatPaginator) paginator: MatPaginator;*/
  ngOnInit(): void {
    this.loadBooks();
  }
  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadBooks())
      )
      .subscribe();
    this.sort.sortChange
      .pipe(
        tap(() => this.loadBooks())
      )
      .subscribe();
  }
  loadBooks(){
    this.bookListService.getBookList(this.paginator.pageIndex, this.paginator.pageSize)
      .pipe(
        takeUntil(this.unsubscribed)
      )
      .subscribe(response => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(response);
        this.cdr.detectChanges();
        //this.dataSource = response;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },error => this.isLoading = false)
  }

}
