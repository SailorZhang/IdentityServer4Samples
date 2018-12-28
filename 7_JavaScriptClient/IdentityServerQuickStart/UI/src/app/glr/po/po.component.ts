import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GLRRequest } from '../../models/GLRRequest';
import { DataService } from '../../core/services/DataService';
import { Po } from '../../models/po';
import { GLRResponse } from '../../models/GLRResponse';

@Component({
  selector: 'po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css'],
  encapsulation: ViewEncapsulation.None // used to prevent css issues
})
export class PoComponent implements OnInit {

  po: Po;
  country = 'US';
  result: GLRResponse = null;
  loading: boolean = false;
  showResult: boolean = false;

  constructor(private service: DataService) {
  }

  getGLR(): void {
    var glrRequest = new GLRRequest()
    glrRequest.country = this.country;
    glrRequest.data_list.push(this.po);
    this.loading = true;
    this.service.getModelResponse("PO", glrRequest).subscribe(glrResponse => {
      if (glrResponse.state_code == 1) {
        this.result = glrResponse;
        this.showResult = true;
      } else if (glrResponse.state_code == 500 || glrResponse.state_code == 2 || glrResponse.state_code == 3) {
        alert(glrResponse.message);
      } else {
        alert(glrResponse["data_list"][0]["error_msg"]);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      alert(error.msg);
    }, () => {
      console.log('completed');
    });
  }

  reset(): void {
    this.showResult = false;
    this.result = null;
  }

  ngOnInit() {
    this.po = new Po();
    this.po.invoice_source_document = "PO";
  }

}
