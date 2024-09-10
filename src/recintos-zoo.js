import { recintos } from './recintos.js';
import { animais } from './animais.js';

class RecintosZoo {

    constructor() {
        this.recintos = recintos;
        this.animais = animais;
        const recintosViaveis = [];
    }

    analisaRecintos(animal, quantidade) {

        if (!(animal in animais)) {
            return { erro: 'Animal inválido' };
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        const { biomas } = animais[animal];
        console.log('Biomas: ');
        for (var i = 0; i < biomas.length; i++) {
            console.log(biomas[i])
        }

        return recintosViaveis;

    }

}

export { RecintosZoo as RecintosZoo };
