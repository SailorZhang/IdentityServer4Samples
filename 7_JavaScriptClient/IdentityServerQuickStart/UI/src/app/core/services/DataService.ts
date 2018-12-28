import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from "rxjs/operators";
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'Rxjs/observable/ErrorObservable';
import { AppConfig } from '../auth/app.config';

@Injectable()
export class DataService {

    private data: Object = null;
    private configData: any = null;
    private modelServerAddr: string = null;

    private serviceID: Object;

    constructor(private http: HttpClient, private config: AppConfig, private router: Router) {
        this.configData = config.getConfig();

        this.modelServerAddr = this.configData.modelServer.address;
        this.modelServerAddr += (this.configData.modelServer.port !== '') ? (':' + this.configData.modelServer.port) : '';
        this.modelServerAddr += (this.configData.modelServer.resource !== '') ? (this.configData.modelServer.resource) : '';

        this.serviceID = this.configData.modelServer.serviceID;
    }

    public getCountries(): string[] {
        return ["IE", "BG", "HR", "GB", "DK", "FI", "NO", "SE", "IT", "GR", "CZ", "SK", "HU", "PL", "RO", "LV", "CY", "BE", "GI", "LU", "NL", "CH", "LI", "DE", "AT", "FR", "MU", "RU", "UA", "ES", "PT", "AD", "IL", "MA", "TN", "KZ", "BD", "LK", "TZ", "MM", "AZ", "TR", "SA", "AE", "EG", "OM", "NG", "ZA", "BW", "KE", "JP", "HK", "CN", "KR", "TW", "ID", "SG", "BN", "MY", "TH", "PH", "IN", "AU", "NZ", "QA", "AO", "MZ", "ZM", "GH", "VN", "BM", "US", "KY", "CA", "AR", "BO", "BR", "CL", "CO", "EC", "MX", "PE", "PR", "UY", "VE", "CR", "TT", "PA", "BB"];
    }

    public getModelResponse(modelKey: string, modelParams: Object) {

        const requestBody = {
            "ServiceId": this.serviceID[modelKey],
            "JsonPostDataDesc": JSON.stringify(modelParams)
        };
        return this.http.post(this.modelServerAddr, JSON.stringify(requestBody), { headers: this.setRequestHeader() })
            .pipe(catchError(this.handleError));
    }

    private setRequestHeader(): HttpHeaders {

        const headers = {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Headers': 'Content-Type',
            // 'Access-Control-Allow-Methods': 'POST',
            // 'Access-Control-Allow-Origin': '*',
        };
        const requestHeader = new HttpHeaders(headers);

        return requestHeader;
    }

    private handleError(error: HttpErrorResponse) {
        const err = { url: error['url'], status: error['status'], msg: error.message };
        return new ErrorObservable(err);
    }
}
