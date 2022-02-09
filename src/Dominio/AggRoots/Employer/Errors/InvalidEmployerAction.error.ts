export class InvalidEmployerAction extends Error {
  static alreadyRegistered() {
    return new InvalidEmployerAction(
      'this employer has been already registered',
    );
  }

  static alreadyEliminated() {
    return new InvalidEmployerAction(
      'this employer has been already eliminated',
    );
  }

  static alreadySuspended() {
    return new InvalidEmployerAction(
      'this employer has been already suspended',
    );
  }

  static alreadyActive() {
    return new InvalidEmployerAction('this employer is Active right now');
  }

  static notSuspended() {
    return new InvalidEmployerAction('this employer is not suspended');
  }
}
