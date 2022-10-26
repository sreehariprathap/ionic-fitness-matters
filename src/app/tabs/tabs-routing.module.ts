import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../features/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'goals',
        loadChildren: () =>
          import('../features/goals/goals.module').then(
            (m) => m.GoalsPageModule
          ),
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('../features/stats/stats.module').then(
            (m) => m.StatsPageModule
          ),
      },
      {
        path: 'me',
        loadChildren: () =>
          import('../features/user/user.module').then((m) => m.UserPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
