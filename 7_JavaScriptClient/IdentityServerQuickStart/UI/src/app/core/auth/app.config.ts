import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AppGlobals } from '../services/AppGlobals';

@Injectable()
export class AppConfig {

    public config: Object = null;

    constructor(private http: HttpClient, private appGlobals: AppGlobals) {
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig() {
        return this.config;
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get(`./config/config.json`)
                .map(res => res).catch((error: any) => {
                    return Observable.throw(error.json().error || 'Server error');
                }).subscribe((configResponse: any) => {
                    this.config = configResponse;
                    resolve(true);
                });

        });
    }
}
