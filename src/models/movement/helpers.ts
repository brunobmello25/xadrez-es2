import { EnPassantMovement, Movement } from ".";
import { CastlingMovement } from "./castlingmovement";

export function isEnPassant(movement: Movement): movement is EnPassantMovement {
  return movement instanceof EnPassantMovement;
}

export function isCastling(movement: Movement): movement is CastlingMovement {
  return movement instanceof CastlingMovement;
}
