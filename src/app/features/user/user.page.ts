import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { ActionSheetController } from '@ionic/angular';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  userData: any;
  fitnessData: any;
  result: string;
  faCircleInfo = faCircleInfo;

  constructor(
    private readonly userService: UserService,
    private readonly auth: AuthService,
    private readonly router: Router,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    const userId = localStorage.getItem('user_id');
    this.userService.getUserDetails({ id: +userId }).subscribe((data: any) => {
      this.userData = data.user;
      this.fitnessData = data.fitness;
    });
  }

  logout() {
    this.auth.logout().subscribe((data: any) => {
      this.router.navigate(['/']);
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure you want to logout',
      buttons: [
        {
          text: 'Logout',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    console.log(result);
    if (result.data.action === 'delete') {
      this.logout();
    }
  }
}
