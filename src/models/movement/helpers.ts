import { EnPassantMovement, Movement } from ".";

export function isEnPassant(movement: Movement): movement is EnPassantMovement {
  return movement instanceof EnPassantMovement;
}
