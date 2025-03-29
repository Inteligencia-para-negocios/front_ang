import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ViewGastosComponent } from './components/view-gastos/view-gastos.component';
import { ViewChequesComponent } from './components/view-cheques/view-cheques.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { AuthGastosComponent } from './components/auth-gastos/auth-gastos.component';
import { CapGastosComponent } from './components/cap-gastos/cap-gastos.component';
import { CapChequeComponent } from './components/cap-cheque/cap-cheque.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule,} from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkListboxModule } from '@angular/cdk/listbox';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { DialogModule } from '@angular/cdk/dialog';
import { TransferComponent } from './components/transfer/transfer.component';
import { CapTransferComponent } from './components/cap-transfer/cap-transfer.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterProvedorComponent } from './components/register-provedor/register-provedor.component';
import { RegisterSucursalComponent } from './components/register-sucursal/register-sucursal.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DepComprasComponent } from './components/dep-compras/dep-compras.component';
import { NavvComponent } from './components/navv/navv.component';
import { ReportAComponent } from './components/report-a/report-a.component';
import { ReportBComponent } from './components/report-b/report-b.component';
import { ReportCComponent } from './components/report-c/report-c.component';
import { EditGastoComponent } from './components/edit-gasto/edit-gasto.component';
import { SolicitudGastoComponent } from './components/solicitud-gasto/solicitud-gasto.component';
import { PresupuestoComponent } from './components/prespuestos/presupuesto/presupuesto.component';
import { AuthTesoreriaComponent } from './components/auth-tesoreria/auth-tesoreria.component';
import { SplashComponent } from './components/splash/splash.component';
import { ModalAuthComponent } from './components/modal-auth/modal-auth.component';
import { RegEmpleadoComponent } from './components/reg-empleado/reg-empleado.component';
import { UnautorizedComponent } from './components/unautorized/unautorized.component';
import { UtilService } from './services/util.service';
import { GastCompComponent } from './components/gast-comp/gast-comp.component';
import { GastosRevolventesComponent } from './components/gastos-revolventes/gastos-revolventes.component';
import { EfeXComponent } from './components/efe-x/efe-x.component';
import { DetalleEfexComponent } from './components/detalle-efex/detalle-efex.component';
import { ReciboEfeXComponent } from './components/recibo-efe-x/recibo-efe-x.component';
import { GastoRevComponent } from './components/gasto-rev/gasto-rev.component';
import { TesoreriaComponent } from './components/tesoreria/tesoreria.component';
import { CorteParcialComponent } from './components/corte-parcial/corte-parcial.component';
import { CutListComponent } from './components/cut-list/cut-list.component';
import { CapturaAjustesComponent } from './components/captura-ajustes/captura-ajustes.component';
import { VerifyPriceComponent } from './components/verify-price/verify-price.component';
import { CaptContraComponent } from './components/capt-contra/capt-contra.component';
import { RepPrespComponent } from './components/rep-presp/rep-presp.component';
import { ContabilidadComponent } from './components/contabilidad/contabilidad.component';
import { SplashVerifyComponent } from './components/splash-verify/splash-verify.component';
import { PublicidadVerifyComponent } from './components/publicidad-verify/publicidad-verify.component';
import { DashPrespComponent } from './components/dash-presp/dash-presp.component';
import { AsignacionPresupuestoComponent } from './components/prespuestos/asignacion-presupuesto/asignacion-presupuesto.component';
import { NewPresupuestoComponent } from './components/prespuestos/new-presupuesto/new-presupuesto.component';
import { ListPrespComponent } from './components/prespuestos/list-presp/list-presp.component';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    ListPrespComponent,
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
    PdfViewerModule,
    MatFormFieldModule,
  ],
  providers: [ViewGastosComponent, UtilService],
  bootstrap: [AppComponent],
})
export class AppModule {}
