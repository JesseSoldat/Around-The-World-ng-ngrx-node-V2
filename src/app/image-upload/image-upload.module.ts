import { NgModule } from "@angular/core";
// modules
import { SharedModule } from "../shared/shared.module";
import { FriendRoutingModule } from "./image-upload-routing.module";
// components
import { ImageUploadComponent } from "./image-upload/image-upload.component";

@NgModule({
  imports: [SharedModule, FriendRoutingModule],
  declarations: [ImageUploadComponent]
})
export class ImageUploadModule {}
