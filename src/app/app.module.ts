import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ViewGastosComponent } from './view-gastos/view-gastos.component';
import { ViewChequesComponent } from './view-cheques/view-cheques.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { AuthGastosComponent } from './auth-gastos/auth-gastos.component';
import { CapGastosComponent } from './cap-gastos/cap-gastos.component';
import { CapChequeComponent } from './cap-cheque/cap-cheque.component';
import { NavbarComponent } from './navbar/navbar.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CUSTOM_ELEMENTS_SCHEMA }   from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatChipsModule} from '@angular/material/chips'; 
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkListboxModule} from '@angular/cdk/listbox';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkMenuModule} from '@angular/cdk/menu';
import {DialogModule} from '@angular/cdk/dialog';
import { TransferComponent } from './transfer/transfer.component';
import { CapTransferComponent } from './cap-transfer/cap-transfer.component';
import { FormBuilder,FormControl,FormGroup,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterProvedorComponent } from './register-provedor/register-provedor.component';
import { RegisterSucursalComponent } from './register-sucursal/register-sucursal.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DepComprasComponent } from './dep-compras/dep-compras.component';
import { NavvComponent } from './navv/navv.component';
import { ReportAComponent } from './report-a/report-a.component';
import { ReportBComponent } from './report-b/report-b.component';
import { ReportCComponent } from './report-c/report-c.component';
import { EditGastoComponent } from './edit-gasto/edit-gasto.component';
import { SolicitudGastoComponent } from './solicitud-gasto/solicitud-gasto.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { AuthTesoreriaComponent } from './auth-tesoreria/auth-tesoreria.component';
import { SplashComponent } from './splash/splash.component';
import { ModalAuthComponent } from './modal-auth/modal-auth.component';
import { RegEmpleadoComponent } from './reg-empleado/reg-empleado.component';
import { UnautorizedComponent } from './unautorized/unautorized.component';
import { UtilService } from './service/util.service';
import { GastCompComponent } from './gast-comp/gast-comp.component';
import { GastosRevolventesComponent } from './gastos-revolventes/gastos-revolventes.component';
import { EfeXComponent } from './efe-x/efe-x.component';
import { DetalleEfexComponent } from './detalle-efex/detalle-efex.component';
import { ReciboEfeXComponent } from './recibo-efe-x/recibo-efe-x.component';
import { GastoRevComponent } from './gasto-rev/gasto-rev.component';
import { TesoreriaComponent } from './tesoreria/tesoreria.component';
import { CorteParcialComponent } from './corte-parcial/corte-parcial.component';
import { CutListComponent } from './cut-list/cut-list.component';
import { CapturaAjustesComponent } from './captura-ajustes/captura-ajustes.component';
import { VerifyPriceComponent } from './verify-price/verify-price.component';
import { CaptContraComponent } from './capt-contra/capt-contra.component';
import { RepPrespComponent } from './rep-presp/rep-presp.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { SplashVerifyComponent } from './splash-verify/splash-verify.component';
import { PublicidadVerifyComponent } from './publicidad-verify/publicidad-verify.component';
import { DashPrespComponent } from './dash-presp/dash-presp.component';
import { AsignacionPresupuestoComponent } from './asignacion-presupuesto/asignacion-presupuesto.component';
import { NewPresupuestoComponent } from './new-presupuesto/new-presupuesto.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewGastosComponent,
    ViewChequesComponent,
    DashboardAdminComponent,
    Dashboard2Component,
    AuthGastosComponent,
    CapGastosComponent,
    CapChequeComponent,
    NavbarComponent,
    TransferComponent,
    CapTransferComponent,
    RegisterProvedorComponent,
    RegisterSucursalComponent,
    DepComprasComponent,
    NavvComponent,
    ReportAComponent,
    ReportBComponent,
    ReportCComponent,
    EditGastoComponent,
    SolicitudGastoComponent,
    PresupuestoComponent,
    AuthTesoreriaComponent,
    SplashComponent,
    ModalAuthComponent,
    RegEmpleadoComponent,
    UnautorizedComponent,
    GastCompComponent,
    GastosRevolventesComponent,
    EfeXComponent,
    DetalleEfexComponent,
    ReciboEfeXComponent,
    GastoRevComponent,
    TesoreriaComponent,
    CorteParcialComponent,
    CutListComponent,
    CapturaAjustesComponent,
    VerifyPriceComponent,
    CaptContraComponent,
    RepPrespComponent,
    ContabilidadComponent,
    SplashVerifyComponent,
    PublicidadVerifyComponent,
    DashPrespComponent,
    AsignacionPresupuestoComponent,
    NewPresupuestoComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ClipboardModule,
    CdkListboxModule,
    CdkMenuModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    DialogModule,
    PdfViewerModule
  ],
  providers: [
    ViewGastosComponent,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
