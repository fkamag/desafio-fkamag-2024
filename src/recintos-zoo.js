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

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

    }

}

export { RecintosZoo as RecintosZoo };
