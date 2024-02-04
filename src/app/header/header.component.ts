import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user.model';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faRightFromBracket = faRightFromBracket;
  user: User | undefined;

  constructor(private authService: AuthService){}


  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  logout(){
    this.authService.logout();
  }

}
