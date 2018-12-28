import { Inject, Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    private basePath = '';

    constructor() {
        this.basePath = '/demo/tcf';
    }

    public getBasePath() {
        return this.basePath;
    }
}
