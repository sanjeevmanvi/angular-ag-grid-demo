import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  columnDefs: ColDef[] = [
    { field: 'make', sortable: true, filter: true, checkboxSelection: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true },
  ];

  rowData: Observable<any[]>;
  constructor(private http: HttpClient) {
    this.rowData = this.http.get<any[]>(
      'https://www.ag-grid.com/example-assets/small-row-data.json'
    );
  }
  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.make} ${node.model}`)
      .join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
