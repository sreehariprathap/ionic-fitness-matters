import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'goals',
    loadChildren: () => import('./features/goals/goals.module').then( m => m.GoalsPageModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./features/stats/stats.module').then( m => m.StatsPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
