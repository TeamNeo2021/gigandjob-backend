export class InvalidEmployerState extends Error { 
    
    static ChangingEliminatedState() {
        return new InvalidEmployerState("ERROR: No se puede cambiar el estado de un Empleador Eliminado")
    }

    static SuspendingSuspendedState() {
        return new InvalidEmployerState("ERROR: No se puede suspender un Empleador que ya ha sido Suspendido")
    }
    
    static FailedVerification() {
        return new InvalidEmployerState("ERROR: Verificacion de estado fallido")
    }
}