import { NgModule } from "@angular/core";

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        MatSidenavModule,
        MatButtonModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule,
    ],
    exports: [
        MatSidenavModule,
        MatButtonModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule,
    ]
})
export class MaterialModule {}