import { Coord } from '../models/coord';
import { Engine, Matrix, Piece } from '../protocols';

export class RandomEngine implements Engine{
    private boardMatrix: Matrix<Piece | null>;

    playTurn(): void {
        piece = this.selectedRandonPiece();
        move = this.selectRandomMove();
        this.playMove(piece, move);
    }

    playMove(piece: Piece, move: Coord){
        
    }

    private selectRandomMove(piece: Piece){

    }

    private selectedRandonPiece(){

    }
}
