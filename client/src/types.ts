
export interface Intervention {
  id: number;                    // Unique identifier
  name: string;                  // Intervention name (e.g., "cough drops")
  description: string;           // Detailed description of the intervention
  severity: string[];            // Array of severity levels: ["mild", "moderate", "severe"]
  product_link: string;          // URL to product page (can be empty string)
  product_image: string;         // URL to product image (can be empty string)
  likes: number;                 // Number of likes/positive ratings
  dislikes: number;              // Number of dislikes/negative ratings
  SOS?: boolean;                 // Optional: true for emergency/urgent interventions
}


export interface Symptom {
  id: number;                    // Unique identifier
  name: string;                  // Symptom name (e.g., "coughing")
  description: string;           // Detailed description of the symptom
  interventions: number[];       // Array of intervention IDs that treat this symptom
}