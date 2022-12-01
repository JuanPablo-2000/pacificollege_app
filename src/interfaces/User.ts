export default interface User {
	id?: number,
    estado?: string, 
	cedula: string, 
	codigo?: string, 
	contrato: string, 
	nombres_titular: string, 
	apellidos_titular: string, 
	correo: string, 
	direccion?: string, 
	celular?: string,
	plan?: string,
	fecha_inicio: Date,
	fecha_final?: Date,
	total: number,
	cuota_inicial?: number,
	saldo?: number,
	valor_cuota: number,
	fecha_pago?: Date,
	cedula_beneficiario: string,
	nombres_b: string,
	apellidos_b: string,
	sexo_b: string,
	correo_b: string,
	edad_b: string,
	fecha_nacimiento_b?: Date,
	direccion_b?: string,
	telefono_b: string,
	consultante_b?: string,
	actual_episodio?: string,
	ultimo_episodio_b?: Date,
	tipoEstudiante?: String,
	induccion_b?: Date,
	congelamiento?: Date,
	observaciones?: string,
	fecha_graduando?: Date
}