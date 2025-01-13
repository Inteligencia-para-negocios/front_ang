import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { ViewChequesComponent } from './view-cheques/view-cheques.component';
import { ViewGastosComponent } from './view-gastos/view-gastos.component';
import { AuthGastosComponent } from './auth-gastos/auth-gastos.component';
import { CapGastosComponent } from './cap-gastos/cap-gastos.component';
import { CapChequeComponent } from './cap-cheque/cap-cheque.component';
import { TransferComponent } from './transfer/transfer.component';
import { CapTransferComponent } from './cap-transfer/cap-transfer.component';
import { RegisterSucursalComponent } from './register-sucursal/register-sucursal.component';
import { RegisterProvedorComponent } from './register-provedor/register-provedor.component';
import { DepComprasComponent } from './dep-compras/dep-compras.component';

import { AuthGuard } from './service/auth-guard.service';
import { EditGastoComponent } from './edit-gasto/edit-gasto.component';
import { AuthTesoreriaComponent } from './auth-tesoreria/auth-tesoreria.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { SolicitudGastoComponent } from './solicitud-gasto/solicitud-gasto.component';
import { RegEmpleadoComponent } from './reg-empleado/reg-empleado.component';
import { UnautorizedComponent } from './unautorized/unautorized.component';
import { GastCompComponent } from './gast-comp/gast-comp.component';
import { GastosRevolventesComponent } from './gastos-revolventes/gastos-revolventes.component';
import { EfeXComponent } from './efe-x/efe-x.component';
import { ReciboEfeXComponent } from './recibo-efe-x/recibo-efe-x.component';
import { GastoRevComponent } from './gasto-rev/gasto-rev.component';
import { TesoreriaComponent } from './tesoreria/tesoreria.component';
import { CorteParcialComponent } from './corte-parcial/corte-parcial.component';
import { CutListComponent } from './cut-list/cut-list.component';
import { SplashComponent } from './splash/splash.component';
import { DetalleEfexComponent } from './detalle-efex/detalle-efex.component';
import { CapturaAjustesComponent } from './captura-ajustes/captura-ajustes.component';
import { VerifyPriceComponent } from './verify-price/verify-price.component';
import { CaptContraComponent } from './capt-contra/capt-contra.component';
import { RepPrespComponent } from './rep-presp/rep-presp.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { PublicidadVerifyComponent } from './publicidad-verify/publicidad-verify.component';
import { SplashVerifyComponent } from './splash-verify/splash-verify.component';



const routes: Routes = [


  //pantall principal al entrar a la aplicacion para loguearse.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'splash', component: SplashComponent },
  //pantalla de administracion de caracter de superusuario.
  {
    path: 'dashboardFull', component: DashboardAdminComponent,
    canActivate: [AuthGuard], data: {
    roles: ['ADMINISTRADOR', 'Gerente']
   }
  }
  // canActivate: [AuthGuard], data: {
  //   roles: ['administrador', 'visualizador', 'capturista', 'tesoreria', 'registros','contralor','contabilidad']
  // }
  ,
  {
    path: 'captura-ajustes', component: CapturaAjustesComponent,
  }
  // canActivate: [AuthGuard], data: {
  //roles: ['administrador','tesoreria',]
  //}
  ,
  {
    path: 'revision', component: ReciboEfeXComponent,
  }
  //   
  ,
  {
    path: 'revolvente', component: GastoRevComponent
    , canActivate: [AuthGuard], data: {
       roles: ['administrador', 'registros']
    }
  },
  //pantalla de administracion de caracter de capturista/Finanzas.
  {
    path: 'dashboard', component: Dashboard2Component,
    // canActivate: [AuthGuard]
  },
  //ruta para la visualizacioon de los cheques registrados por el usuario..
  {
    path: 'view-check', component: ViewChequesComponent,
    //  canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'visualizador']
    // }
  },
  {
    path: 'reports', component: EfeXComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'contralor'] // Roles requeridos para acceder a la ruta 'admin'
    // }
  },
  // ruta para la visualizacion de los gastos efectuados.
  {
    path: 'view-gastos', component: ViewGastosComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['capturista', 'administrador', 'visualizador', 'registros']
    // }
  },
  //ruta para la autorizacion de gastos mayores .
  {
    path: 'auth-gastos', component: AuthGastosComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador',] // Roles requeridos para acceder a la ruta 'admin'
    // }
  },
  //ruta para la visualizacion de la captura de informacion sobre gastos.
  {
    path: 'captura-gastos', component: CapGastosComponent,
    //  canActivate: [AuthGuard],
    // data: {
    //   roles: ['administrador', 'capturista', 'registros']
    // }
  },
  { path: 'edit', component: EditGastoComponent },
  // ruta para la captura de informacion sobre cheques.
  {
    path: 'captura-cheque', component: CapChequeComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'visualizador']
    // }
  },
  //ruta de vista de transferencias
  {
    path: 'captura-transfer', component: CapTransferComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador']
    // }
  },
  // ruta para la captura de informacion de transferencias.
  {
    path: 'transfer', component: TransferComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador']
    // }
  },
  {
    path: 'registro-sucursal', component: RegisterSucursalComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'registros']
    // }
  },
  {
    path: 'registro-provedor', component: RegisterProvedorComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'registros', 'capturista']
    // }
  },
  {
    path: 'ventas', component: DepComprasComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador']
    // }
  },
  // {
  //   path: 'liberacion', component: AuthTesoreriaComponent, 
  // canActivate: [AuthGuard], data: {
  // //     roles: ['tesoreria', 'administrador']
  // //   }
  // },
  // {
  //   path: 'cortes-parciales', component: CorteParcialComponent, 
  // canActivate: [AuthGuard], data: {
  // //     roles: ['tesoreria', 'administrador']
  // //   }
  // },
  {
    path: 'presupuesto', component: PresupuestoComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador',]
    // }
  },
  {
    path: 'asignacion', component: RepPrespComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador',]
    // }
  },
  {
    path: 'solicitud', component: SolicitudGastoComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador']
    // }
  },
  {
    path: 'registro-empleado', component: RegEmpleadoComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'registros','capturista']
    // }
  }
  , {
    path: 'gastos-comprobados', component: GastCompComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'visualizador','contabilidad']
    // }
  }, {
    path: 'gastos-recurrentes', component: GastosRevolventesComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'visualizador']
    // }
  },
  {
    path: 'contratista', component: CaptContraComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador']
    // }
  },
  {
    path: 'detalleFex', component: DetalleEfexComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'visualizador', 'tesoreria', 'contralor']
    // }
  }
  ,
  {
    path: 'contabilidad', component: ContabilidadComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador','contabilidad']
    // }
  }

  //{
  //   path: 'tesoreria', component: TesoreriaComponent, 
  // canActivate: [AuthGuard], data: {
  // //     roles: ['administrador', 'tesoreria']
  // //   }
  // }
  //implementar rutas padre y rutas hijas 
  ,
  { path: 'unAuth', component: UnautorizedComponent },
  { path: 'verificador/:parametro', component: VerifyPriceComponent },

  { path: 'publicidad', component: PublicidadVerifyComponent },
  { path: 'splashV', component: SplashVerifyComponent },


  {
    path: 'cortes-parciales', component: CorteParcialComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'tesoreria']
    // }
  }
  , {
    path: 'tesoreria', component: TesoreriaComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'tesoreria']
    // }
  }
  , {
    path: 'liberacion', component: AuthTesoreriaComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'tesoreria']
    // }
  }
  , {
    path: 'listcut', component: CutListComponent,
    // canActivate: [AuthGuard], data: {
    //   roles: ['administrador', 'tesoreria']
    // }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



