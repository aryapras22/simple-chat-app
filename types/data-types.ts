/**
 * Participant role enumeration
 * 0 = Admin, 1 = Agent, 2 = Customer
 */
export enum ParticipantRole {
  Admin = 0,
  Agent = 1,
  Customer = 2
}

/**
 * Participant in a chat room
 */
export interface Participant {
  id: string;
  name: string;
  role: ParticipantRole;
}

/**
 * Message type enumeration
 */
export type MessageType = 'text' | 'image' | 'video' | 'file';

/**
 * Chat message/comment
 */
export interface Comment {
  id: number;
  type: MessageType;
  message: string;
  sender: string;
}

/**
 * Chat room information
 */
export interface Room {
  name: string;
  id: number;
  image_url: string;
  participant: Participant[];
}


export interface ChatRoomData {
  room: Room;
  comments: Comment[];
}

/**
 * API response structure
 */
export interface ApiResponse {
  results: ChatRoomData[];
}