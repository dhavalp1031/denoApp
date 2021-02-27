declare namespace API {
  export module DenoApp {
    interface IdentifiedEnrollee extends Enrollee {
      id: string;
    }

    interface MappedEnrollee {
      [id: string] : {
        active: boolean;
        name: string;
        dateOfBirth?: string;
      };
    }

    interface Enrollee {
      active: boolean;
      name: string;
      dateOfBirth?: string;
    }

    interface PutEnrolleeBody {
      name: string;
      active: boolean;
    }
  }
}
