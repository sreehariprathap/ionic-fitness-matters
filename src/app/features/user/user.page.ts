import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  userData: any;
  fitnessData: any;
  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    const userId = localStorage.getItem('user_id');
    this.userService.getUserDetails({ id: +userId }).subscribe((data: any) => {
      this.userData = data.user;
      this.fitnessData = data.fitness;
      console.log(this.userData,this.fitnessData);
    });
  }
}
