import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormInfoComponent } from "./form-info/form-info.component";

@NgModule({
  imports: [CommonModule],
  exports: [FormInfoComponent],
  declarations: [FormInfoComponent]
})
export class SharedModule {}
