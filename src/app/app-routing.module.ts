import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { AuthGuard } from "./_services/guards/auth.guard";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
    canActivate: [AuthGuard]
  },
  {
    path: "map",
    loadChildren: "./story/story.module#StoryModule",
    canActivate: [AuthGuard]
  },
  {
    path: "imageUpload",
    loadChildren: "./image-upload/image-upload.module#ImageUploadModule",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
