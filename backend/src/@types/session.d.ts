// import mongoose from "mongoose";

// declare module "express-session" {
//     interface SessionData {
//         userId: mongoose.Types.ObjectId;
//     }
// }

// Importation de express-session pour étendre ses types de données de session
import session from 'express-session';

// Extension de l'interface SessionData dans express-session

declare module 'express-session' {
  export interface SessionData {
    userId?: string;  // Utilisez le type string si votre identifiant utilisateur est une chaîne de caractères
  }
}

// Import express-session to extend its session data types
// import 'express-session';

// // Extend the SessionData interface in express-session
// declare module 'express-session' {
//   export interface SessionData {
//     userId?: string;  // Use string type if your user ID is a string
//   }
// }