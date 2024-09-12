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

        const { biomas, tamanho, carnivoro } = animais[animal];
        var recintosViaveis = [];
        const espacoRequerido = tamanho * quantidade;

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

        biomaAdequado = biomaAdequado.filter(recinto => {
            return recinto.espacoLivre > espacoRequerido;
        });

        biomaAdequado = biomaAdequado.filter(recinto => {
            console.log(recinto);
            console.log(carnivoro)
            console.log(recinto.animais.length)
            if (carnivoro && recinto.animais.length > 0) {
                return recinto.animais.every(anim => anim.especie === animal);
            }
            return true;
        });

        biomaAdequado.forEach(recinto => {
            recintosViaveis.push(
                `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre - (quantidade * tamanho)} total: ${recinto.tamanho})`
                )
        })

        console.log(recintosViaveis)

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável'};
        }

        return { recintosViaveis };

    }

}

export { RecintosZoo as RecintosZoo };
