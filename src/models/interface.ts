//Interfaces de API

export interface Sucursal {
    dateCreate: Date,
    dateUpdate: Date,
    idBranch: number,
    nameBranch: String,
    route?: String,
    sede: String,
    ubicacion: String
}

export interface Role {
    idRole: number,
    nameRole: string,
    dateCreate: Date,
    dateUpdate: Date,
}

export interface Area {
    idArea: number,
    nameArea: string,
    idResponsible?: {},
    dateCreate: Date
    dateUpdate?: Date,
}

export interface User {
    idUser: number,
    nameUser: string,
    lastName: string,
    username: string,
    password: string,
    RFC: string,
    usuario: string,
    nameRole: {},
    nameBranch: {},
    nameArea: {}
    dateCreate: Date,
    dateUpdate?: Date,
}

export interface Provedor {
    idProvider: number,
    nameProvider: string,
    RFC: string,
    phone: string,
    address: string,
    city: string,
    codigoPostal: string,
    State: string,
    dateCreate: Date,
    dateUpdate?: Date,
}

export interface Status {
    idStatus: number,
    nameStatus: string,
    dateCreate: Date,
    dateUpdate?: Date,
    entity?: number
}

export interface Cheque {
    idBCheck: Number,
    invoice: string,
    //type: string,
    amount: string,
    reference: string,
    Nombre: string,
    dateCreate: Date,
    nameStatus: String
    Contabilidad: String
    Capturista: String
    checkbook: String,
    remanente: number,
    remanentevirtual: number
}


export interface Transfer {
    idTransfer: number,
    account: string,
    addressee: string,
    amount: string,
    reference: string,
    nameUser: {},
    dateCreate: Date,
    dateUpdate?: Date,
}

export interface Reporte {
    idReport: number,
    idConcept: {},
    justificacion: string,
    idBranch: {},
    idUser: {},
    idUserAuth: {},
    idUserResp: {},
    idStatus?: {},
    idBCheck?: {}
    idTransfer?: {}
    dateCreate: Date,
    dateUpdate?: Date,

}

export interface Concept {
    idConcept: number,
    nombreConcept: string,
    dateCreate: Date,
    dateUpdate: Date
}

export interface Responsable {
    FechaIngreso: Date,
    Materno: string,
    Paterno: string,
    Nombre: string,
    Puesto: string,
    RazonSocial: string,
    Sucursal: string
}

export interface Presupuesto {
    idPresupuesto: number,
    presupuesto: String,
    monto: Number,
    fechaInicio: Date,
    fechaFinal: Date,
    dateCreate: Date,
    nameStatus: String,
    dateUpdate?: Date,

}

export interface ReporteGastos {
    Folio: number,
    Concepto: string,
    Sucursal: string,
    Capturista: string,
    Autorizador: string,
    Responsable: string,
    Liberado: number,
    EfeCo: number,
    Provedor: string,
    Justificacion: string,
    Autorizado: string,
    Efectivo: string,
    Chequera: string,
    Comprobado: string
    idBCheck :  Number
    idResponsable : Number
    amount : Number
    remanente : Number
    DateCreate : string
}


export interface Empleado {
    idEmpleado: number,
    Nombre: String,
    Paterno: string,
    Materno: string,
    idSucursal: number,
    direccion: string,
    colonia: string,
    municipio: string,
    estado: string,
    estado_civil: string,
    celular: string,
    celularFamiliar: string,
    RFC_empleado: String,
    CURP: string,
    NSS: string,
    puesto_ini: number,
    puesto_end: number,
    dateCreate: Date,
    dateUpdate: Date
}

export interface Puesto{
    idPuesto: number,
    puesto : string,
    NoAutorizado: number,
    idUsuarioCrea: number,
    dateCreate : Date,
    NoContratados : number,
    dateUpdate: Date,
    puesto_status: number,
    idSalario : number
}