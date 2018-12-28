import { Component } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'rebar-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    isVisible: boolean;

    constructor(private authservice: AuthService) {

    }

    ngOnInit() {
        // Trigger login flow
        this.authservice.setup();
        if (!this.authservice.authenticationEnabled()) {
            this.isVisible = true;
        } else if ((this.authservice.authenticationEnabled() && this.authservice.IsAuthenticated()) == true) {
            this.isVisible = true;
        }
    }
}

