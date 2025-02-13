// src/firebaseAuth.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from "../config";

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);