import { recintos } from './recintos.js';
import { animais } from './animais.js';

class RecintosZoo {

    analisaRecintos(animal, quantidade) {

        if (!(animal in animais)) {
            return { erro: 'Animal inválido' };
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        const { biomas, tamanho } = animais[animal];
        var recintosViaveis = [];
        const espacoRequerido = animais[animal].tamanho * quantidade;

        recintos.forEach(recinto => {
            let espacoOcupado = 0;
            let espacoLivre = recinto.tamanho;

            recinto.animais.forEach(animalRecinto => {
                espacoOcupado += animalRecinto.quantidade * animais[animalRecinto.especie].tamanho;
                espacoLivre -= espacoOcupado;
            })
            recinto.espacoOcupado = espacoOcupado;
            recinto.espacoLivre = espacoLivre;
        });

        var biomaAdequado = recintos.filter(recinto =>
            biomas.some(bioma => recinto.bioma.includes(bioma)));

        var biomaAdequado = biomaAdequado.filter(recinto => {
            return recinto.espacoLivre > espacoRequerido;
        });

        recintosViaveis = biomaAdequado;

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável'};
        }

        return { recintosViaveis };

    }

}

export { RecintosZoo as RecintosZoo };
