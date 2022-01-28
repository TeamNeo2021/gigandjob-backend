export class InvalidOfferState extends Error {
  
    static BadCreatedOffer() {
        return new InvalidOfferState("ERROR: La oferta recién creada solo puede ser activa")
    }

    static BadClosedOffer() {
        return new InvalidOfferState("ERROR: No se puede cerrar la oferta sin una aplicación")
    }

    static ClosedFromSuspended() {
        return new InvalidOfferState("ERROR: No se puede cerrar la oferta ya que está suspendida")
    }

    static ChangingClosedState() {
        return new InvalidOfferState("ERROR: Ya la oferta está concretada, no se puede abrir o suspender")
    }

    static ChangingEliminatadState() {
        return new InvalidOfferState("ERROR: Ya la oferta está eliminada, no puede cambiar su estado, jamás")
    }

    static SuspendingSuspendedState() {
        return new InvalidOfferState("ERROR: Ya la oferta está eliminada, no puede cambiar su estado, jamás")
    }

    static ReactivteNotSuspendedState() {
        return new InvalidOfferState("ERROR: Como la oferta no está suspendida no se puede reactivar")
    }

    static ReactivteActiveState() {
        return new InvalidOfferState("ERROR: Como la oferta ya esta activada no se puede reactivar")
    }

    static EliminateNotSuspendedState() {
        return new InvalidOfferState("ERROR: Como la oferta no está suspendida no se puede eliminar");
    }

    static FailedVerification() {
        return new InvalidOfferState("ERROR: Verificacion de estado fallido")
    }
}