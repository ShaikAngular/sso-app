import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
//import { filter } from 'minimatch';
import swal from 'sweetalert2';

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
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
   //this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  login(){
    this.oauthService.initImplicitFlow();
    
  }
  
  logout(){
    swal(
      {
    title: 'Do you want to logout?',
    
   showCancelButton:true,
   cancelButtonText:'Logout from SSO',
   showCloseButton:true,
   showConfirmButton:true,
   confirmButtonText:'Logout from Local',
   showLoaderOnConfirm:true
     
     }).then(result=>
      {
        if(result.dismiss){
          this.oauthService.logOut();
        }
        if(result.value){
          sessionStorage.clear();
          document.location.href = window.location.origin + '/index.html'
        }
        console.log("result",result)
      }
       
     )
    
    
    // sessionStorage.clear();
    // document.location.href = window.location.origin + '/index.html'
    //this.oauthService.logOut();
    //document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://www.example.com";
    console.log("token",this.token)
  
    //this.oauthService.logOut();
    //console.log("logout", this.oauthService.logOut())
  }

  get token(){
    let claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  
}
