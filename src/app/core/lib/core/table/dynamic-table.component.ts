import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicTableService } from './dynamic-table.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
  @Input() tableData: any = [
    {
      "Po Number": 1234567890,
      "Order Date": "24.08.2021",
      "Acknowledge At": "24.08.2021",
      "Incoterms": "EXW/ Cost Freight",
      "PO Total Amount": "150000000"
    },
    {
      "Po Number": 1234567891,
      "Order Date": "24.08.2021",
      "Acknowledge At": "24.08.2021",
      "Incoterms": "EXW/ Cost Freight",
      "PO Total Amount": "150000011"
    },
    {
      "Po Number": 1234567892,
      "Order Date": "24.08.2021",
      "Acknowledge At": "24.08.2021",
      "Incoterms": "EXW/ Cost Freight",
      "PO Total Amount": "150000008"
    },
    {
      "Po Number": 1234567893,
      "Order Date": "24.08.2021",
      "Acknowledge At": "24.08.2021",
      "Incoterms": "EXW/ Cost Freight",
      "PO Total Amount": "150000007"
    },
    {
      "Po Number": 1234567894,
      "Order Date": "23.08.2021",
      "Acknowledge At": "24.08.2021",
      "Incoterms": "EXW/ Cost Freight",
      "PO Total Amount": "150000002"
    },
    {
      "Po Number": 1234567895,
      "Order Date": "25.08.2021",
      "Acknowledge At": "24.08.2021",
      "Incoterms": "EXW/ Cost Freight",
      "PO Total Amount": "1500000003"
    }
  ];
  @Output() pageChange = new EventEmitter<any>();
  @Output() editRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<any>();
  @Output() viewRow = new EventEmitter<any>();
  isAscendingList: any = {};
  tableDataSource: any = {
    column: [],
    rowValue: []
  };
  searchText: string = '';
  totalPages: number = 0;
  pageOptions: number[] = [5, 10, 20];
  currentNumberOfRecords: number = 5;
  currentPage: number = 1;
  constructor(
    private dynamicTableService: DynamicTableService
  ) {
  }

  ngOnInit(): void {
    if (this.tableData && this.tableData.length > 0) {
      this.bindTableData(this.tableData.slice((this.currentPage - 1) * 5, this.currentNumberOfRecords));
    }
    else {
      this.bindTableData([]);
    }
  }

  bindTableData(data_list: any = []) {
    this.tableDataSource = this.dynamicTableService.getColumnNames(data_list);
    if (this.tableDataSource && this.tableDataSource.column && this.tableDataSource.column.length > 0) {
      this.tableDataSource.column.forEach((element: any) => {
        this.isAscendingList[element] = false;
      });
    }
    this.updatePageSelection();
  }
  sortList(colName: string, orderBy: string = '') {
    this.tableDataSource.rowValue = this.dynamicTableService.sortArrayList(this.tableDataSource.rowValue, colName, orderBy);
  }

  removeRow(i: number) {
    this.deleteRow.emit(i);
  }

  editTableRow(i: number) {
    this.editRow.emit(i);
  }

  viewItem(i: number) {
    this.viewRow.emit(i);
  }

  onPageChange(pageNo: number) {
    this.currentPage = pageNo;
    this.bindTableData(this.tableData.slice((this.currentPage - 1) * 5, (this.currentNumberOfRecords * this.currentPage)));
    this.pageChange.emit(pageNo);
  }
  onPageOptionSelection(numberOfPages: number) {
    this.currentNumberOfRecords = numberOfPages;
    this.bindTableData(this.tableData.slice((this.currentPage - 1) * 5, this.currentNumberOfRecords));
    this.updatePageSelection();
  }

  updatePageSelection() {
    this.totalPages = Math.ceil(this.tableData.length / this.currentNumberOfRecords);
  }
}
