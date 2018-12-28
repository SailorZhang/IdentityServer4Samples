import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../core/services/DataService';
import { GLRRequest } from '../../models/GLRRequest';
import { GLRResponse } from '../../models/GLRResponse';
import { Nonpo } from '../../models/nonpo';

@Component({
  selector: 'nonpo',
  templateUrl: './nonpo.component.html',
  styleUrls: ['./nonpo.component.css'],
  encapsulation: ViewEncapsulation.None //used to prevent css issues
})
export class NonpoComponent implements OnInit {

  nonpo: Nonpo;
  country = '';
  countries: string[];
  result: GLRResponse = null;
  loading: boolean = false;
  showResult: boolean = false;

  constructor(private service: DataService) {
  }

  getGLR(): void {
    var glrRequest = new GLRRequest()
    glrRequest.country = this.country;
    glrRequest.data_list.push(this.nonpo);
    this.loading = true;
    this.service.getModelResponse("NONPO", glrRequest).subscribe((glrResponse: GLRResponse) => {
      if (glrResponse.state_code == 1) {
        this.result = glrResponse;
        this.showResult = true;
      } else if (glrResponse.state_code == 500 || glrResponse.state_code == 2 || glrResponse.state_code == 3) {
        alert(glrResponse.message);
      } else {
        alert(glrResponse["data_list"][0]["error_msg"]);
      }
      this.loading = false;
    }, (error) => {
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
    this.nonpo = new Nonpo();
    this.nonpo.invoice_source_document = "Non-PO";
    this.countries = this.service.getCountries();
    this.country = this.countries[0];
  }
}
