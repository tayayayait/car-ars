export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  plateNumberLast4: string;
  modelName: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CallLog {
  id: string;
  vehicleId: string; // The vehicle intended to be reached
  vehiclePlate: string; // Snapshot for display
  callerPhoneHash: string; // Simulated privacy hash
  callStatus: 'connected' | 'failed' | 'busy' | 'not_found';
  timestamp: string;
  smsSent: boolean; // Tracking the viral loop
}

export type ViewState = 'home' | 'dashboard' | 'simulation';

// Simulated API Response for the ARS system
export interface ARSResponse {
  action: 'connect' | 'prompt' | 'play_audio';
  targetNumber?: string; // The masked or real number to bridge (simulated)
  audioMessage?: string;
  meta?: any;
}