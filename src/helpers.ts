import { PlayerType } from "./protocols";

export function playerIsHuman(player: PlayerType): player is "human" {
  return player === "human";
}

export function playerIsComputer(player: PlayerType): player is "computer" {
  return player === "computer";
}
