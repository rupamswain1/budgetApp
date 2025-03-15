declare module "redux-persist/lib/storage/session" {
    import { Storage } from "redux-persist";
    const sessionStorage: Storage;
    export default sessionStorage;
  }
  