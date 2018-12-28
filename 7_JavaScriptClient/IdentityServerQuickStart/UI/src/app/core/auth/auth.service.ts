import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppConfig } from './app.config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    configData: any = null;
    constructor(private oauthService: OAuthService, private config: AppConfig) {
        this.configData = config.getConfig();
    }

    public setup(): void {
        if (this.authenticationEnabled()) {
            this.setupConfiguration();
            this.oauthService.tryLogin({});
            this.removeHashFromUrl();
        }
    }

    public handleAuthentication(): boolean {
        if (this.authenticationDisabled() || this.oauthService.hasValidAccessToken() || this.customVerifyAuth()) {
            return true;
        }
        this.setRedirect();
        this.oauthService.clearHashAfterLogin = true;
        this.oauthService.initImplicitFlow();
        return false;
    }

    public IsAuthenticated(): boolean {
        return this.oauthService.hasValidAccessToken() || this.customVerifyAuth();
    }

    // Fix for removing #id_token part from url once it has been stored in the app
    public removeHashFromUrl(): void {
        if (window.location.href.indexOf('#') >= 0) {
            window.location.hash = '';
        }
    }

    public getUserClaims(): any {
        const claims = this.oauthService.getIdentityClaims() as any;
        console.log('<<<  Claims >>>>' + JSON.stringify(claims));
        console.log('<<<  given_name >>>>' + claims.given_name);
        return claims;

    }

    public authenticationEnabled(): boolean {
        return this.configData.eso.enabled === true;
    }

    public getTokenField(field: string) {
        const token = this.oauthService.getAccessToken() || this.customGetToken();

        if (!token) {
            return '';
        }

        const decoded = jwt.decode(token);

        return decoded[field];
    }

    private authenticationDisabled(): boolean {
        return !this.authenticationEnabled();
    }

    private setupConfiguration() {
        this.oauthService.skipIssuerCheck = true;
        this.oauthService.clearHashAfterLogin = true;
        this.oauthService.issuer = this.configData.eso.issuer;
        this.oauthService.loginUrl = this.configData.eso.loginUrl;
        this.oauthService.logoutUrl = this.configData.eso.logoutUrl;
        this.oauthService.redirectUri = this.configData.eso.redirectUri;
        this.oauthService.clientId = this.configData.eso.clientId;
        this.oauthService.scope = this.configData.eso.scope;
        this.oauthService.responseType = this.configData.eso.responseType;
        this.oauthService.oidc = this.configData.eso.oidc;
        this.oauthService.setStorage(localStorage);
    }

    private setRedirect() {
        localStorage.setItem('toRedirect', this.configData.eso.redirectSubUri);
    }

    private customVerifyAuth() {
        if (this.customGetToken()) {
            const expiresAt = localStorage.getItem('expires_at');
            const now = new Date();
            if (expiresAt && parseInt(expiresAt, 10) < now.getTime()) {
                return false;
            }
            return true;
        }

        return false;
    }

    private customGetToken() {
        if (localStorage.getItem('access_token')) {
            return localStorage.getItem('access_token');
        }

        return null;
    }
}
