import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
//import { filter } from 'minimatch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sso-app';
  constructor(private oauthService:OAuthService){
    this.configureSingleSignOn();
  }
  configureSingleSignOn(){
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
   // this.oauthService.loadDiscoveryDocumentAndTryLogin();
   this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  // login(){
  //   this.oauthService.initImplicitFlow();
  // }
  
  logout(){
    this.oauthService.logOut();
  }

  get token(){
    let claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  
}
