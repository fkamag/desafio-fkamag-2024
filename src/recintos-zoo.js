import { recintos } from './recintos.js';
import { animais } from './animais.js';

class RecintosZoo {

    constructor() {
        this.recintos = recintos;
        this.animais = animais;
    }

    analisaRecintos(animal, quantidade) {

        if (!(animal in animais)) {
            return { erro: 'Animal inválido' };
        }
    }

}

export { RecintosZoo as RecintosZoo };
