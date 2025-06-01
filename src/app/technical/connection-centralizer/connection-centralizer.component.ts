// import { User } from "../model/user";
// import { IConnectionListener } from "./iconnection-listener";

// export class ConnectionCentralizer {
//     private static instance : ConnectionCentralizer;
//     private listeners: IConnectionListener[] = new Array<IConnectionListener>();
//     public user!: User | null;
//     public jwt!: string | null;
  
//     private constructor() {}
  
//     public static getInstance(): ConnectionCentralizer {
//       if (ConnectionCentralizer.instance == null) {
//         ConnectionCentralizer.instance = new ConnectionCentralizer();
//       }
//       return ConnectionCentralizer.instance;
//     }
    
//     ConnectionChanged(newConnectionUser: User | null, jwt: string | null) {
//       this.user = newConnectionUser;
//       this.jwt = jwt;
//       this.listeners.forEach((curListener) => {
//           curListener.connectionChanged(newConnectionUser);
//       });
//     }
    
//     addListener(listener: IConnectionListener) {
//       this.listeners.push(listener);
//     }
    
//     removeListener(listener: IConnectionListener) {
//       this.listeners.filter(
//         (currentListener) => listener.getName() != currentListener.getName()
//       );
//     }
  
// }
