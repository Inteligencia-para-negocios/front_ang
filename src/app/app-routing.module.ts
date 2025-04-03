import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ViewGastosComponent } from './components/view-gastos/view-gastos.component';
import { AuthGastosComponent } from './components/auth-gastos/auth-gastos.component';
import { CapGastosComponent } from './components/cap-gastos/cap-gastos.component';
import { CapChequeComponent } from './components/cap-cheque/cap-cheque.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { CapTransferComponent } from './components/cap-transfer/cap-transfer.component';
import { RegisterSucursalComponent } from './components/register-sucursal/register-sucursal.component';
import { RegisterProvedorComponent } from './components/register-provedor/register-provedor.component';
import { DepComprasComponent } from './components/dep-compras/dep-compras.component';
import { EditGastoComponent } from './components/edit-gasto/edit-gasto.component';
import { AuthTesoreriaComponent } from './components/auth-tesoreria/auth-tesoreria.component';
import { PresupuestoComponent } from './components/prespuestos/presupuesto/presupuesto.component';
import { SolicitudGastoComponent } from './components/solicitud-gasto/solicitud-gasto.component';
import { RegEmpleadoComponent } from './components/reg-empleado/reg-empleado.component';
import { UnautorizedComponent } from './components/unautorized/unautorized.component';
import { GastCompComponent } from './components/gast-comp/gast-comp.component';
import { GastosRevolventesComponent } from './components/gastos-revolventes/gastos-revolventes.component';
import { GastoRevComponent } from './components/gasto-rev/gasto-rev.component';
import { TesoreriaComponent } from './components/tesoreria/tesoreria.component';
import { CorteParcialComponent } from './components/corte-parcial/corte-parcial.component';
import { CutListComponent } from './components/cut-list/cut-list.component';
import { SplashComponent } from './components/splash/splash.component';
import { DetalleEfexComponent } from './components/detalle-efex/detalle-efex.component';
import { VerifyPriceComponent } from './components/verify-price/verify-price.component';
import { CaptContraComponent } from './components/capt-contra/capt-contra.component';
import { ContabilidadComponent } from './components/contabilidad/contabilidad.component';
import { PublicidadVerifyComponent } from './components/publicidad-verify/publicidad-verify.component';
import { SplashVerifyComponent } from './components/splash-verify/splash-verify.component';
import { NewPresupuestoComponent } from './components/prespuestos/new-presupuesto/new-presupuesto.component';
import { AsignacionPresupuestoComponent } from './components/prespuestos/asignacion-presupuesto/asignacion-presupuesto.component';
import { ListPrespComponent } from './components/prespuestos/list-presp/list-presp.component';
import { PermissionGuard } from './guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'splash', component: SplashComponent },
  { path: 'dashboardFull', component: DashboardAdminComponent },
  { path: 'listap', component: ListPrespComponent, canActivate: [PermissionGuard], data: { permiso: ['VIEW_PRESUPUESTO'] } },
  { path: 'revolvente', component: GastoRevComponent, canActivate: [PermissionGuard], data: { permiso: ['CREATE_GASTO_REV'] } },
  { path: 'view-gastos', component: ViewGastosComponent, canActivate: [PermissionGuard], data: { permiso: ['VIEW_GASTO'] } },
  { path: 'auth-gastos', component: AuthGastosComponent, canActivate: [PermissionGuard], data: { permiso: ['UPDATE_GASTO'] } },
  { path: 'captura-gastos', component: CapGastosComponent, canActivate: [PermissionGuard], data: { permiso: ['CREATE_GASTO'] } },
  { path: 'edit', component: EditGastoComponent, canActivate: [PermissionGuard], data: { permiso: ['UPDATE_GASTO'] } },
  { path: 'captura-cheque', component: CapChequeComponent, canActivate: [PermissionGuard], data: { permiso: ['CREATE_CHEQUE'] } },
  { path: 'captura-transfer', component: CapTransferComponent, canActivate: [PermissionGuard], data: { permiso: ['CREATE_TRANSACCION'] } },
  { path: 'transfer', component: TransferComponent, canActivate: [PermissionGuard], data: { permiso: ['VIEW_TRANSACCION'] } },
  { path: 'registro-sucursal', component: RegisterSucursalComponent, canActivate: [PermissionGuard], data: { permiso: ['CREATE_SUCURSAL'] } },
  { path: 'registro-provedor', component: RegisterProvedorComponent, canActivate: [PermissionGuard], data: { permiso: ['CREATE_PROVEEDOR'] } },
  { path: 'ventas', component: DepComprasComponent },
  { path: 'create', component: NewPresupuestoComponent, canActivate: [PermissionGuard], data: { permiso: ['CREATE_PRESUPUESTO'] } },
  { path: 'asignacion', component: AsignacionPresupuestoComponent, canActivate: [PermissionGuard], data: { permiso: ['CREATE_ASIGNACION'] } },
  { path: 'presupuesto', component: PresupuestoComponent, canActivate: [PermissionGuard], data: { permiso: ['VIEW_PRESUPUESTO'] } },
  { path: 'solicitud', component: SolicitudGastoComponent, canActivate: [PermissionGuard], data: { permiso: ['CREATE_SOLICITUD'] } },
  { path: 'registro-empleado', component: RegEmpleadoComponent, canActivate: [PermissionGuard], data: { permiso: ['VIEW_EMPLEADO'] } },
  { path: 'gastos-comprobados', component: GastCompComponent, canActivate: [PermissionGuard], data: { permiso: ['VIEW_GASTO'] } },
  { path: 'gastos-recurrentes', component: GastosRevolventesComponent, canActivate: [PermissionGuard], data: { permiso: ['VIEW_GASTO_REV'] } },
  { path: 'contratista', component: CaptContraComponent, canActivate: [PermissionGuard], data: { permiso: ['CREATE_CONTRATO'] } },
  { path: 'detalleFex', component: DetalleEfexComponent, canActivate: [PermissionGuard], data: { permiso: ['VIEW_EFECTIVO'] } },
  { path: 'contabilidad', component: ContabilidadComponent, canActivate: [PermissionGuard], data: { permiso: ['VIEW_CONTABILIDAD'] } },
  { path: 'unAuth', component: UnautorizedComponent },
  { path: 'verificador/:parametro', component: VerifyPriceComponent },
  { path: 'publicidad', component: PublicidadVerifyComponent },
  { path: 'splashV', component: SplashVerifyComponent },
  { path: 'cortes-parciales', component: CorteParcialComponent },
  { path: 'tesoreria', component: TesoreriaComponent},
  { path: 'liberacion', component: AuthTesoreriaComponent, canActivate: [PermissionGuard], data: { permiso: ['UPDATE_GASTO'] } },
  { path: 'listcut', component: CutListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}