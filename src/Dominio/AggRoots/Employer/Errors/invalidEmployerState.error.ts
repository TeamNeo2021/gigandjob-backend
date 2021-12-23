export class InvalidEmployerState extends Error { 
    
    static ChangingEliminatadState() {
        return new InvalidEmployerState("ERROR: No se puede cambiar el estado de un Empleador Eliminado")
    }
    
    static FailedVerification() {
        return new InvalidEmployerState("ERROR: Verificacion de estado fallido")
    }
}