import { recintos } from './recintos.js';
import { animais } from './animais.js';

class RecintosZoo {

    analisaRecintos(animal, quantidade) {

        // verifica se animal é válido
        if (!(animal in animais)) {
            return { erro: 'Animal inválido' };
        }

        // verifica se quantidade é válida
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        // informações necessárias ao longo do código
        const { biomas, tamanho, carnivoro } = animais[animal];
        var recintosViaveis = [];
        const espacoRequerido = tamanho * quantidade;

        // define espaços Ocupados e Livres em cada recinto
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

        // filtra os biomas compatíveis com a requisição
        var biomaAdequado = recintos.filter(recinto =>
            biomas.some(bioma => recinto.bioma.includes(bioma)));

        // filtra os biomas com capacidade para atender a requisição
        biomaAdequado = biomaAdequado.filter(recinto => {
            return recinto.espacoLivre > espacoRequerido;
        });

        // verifica se tem animais carnívoros na requisição ou nos recintos
        biomaAdequado = biomaAdequado.filter(recinto => {
            if (recinto.animais.length > 0) {
                const animalNoRecintoEhCarnivoro = animais[recinto.animais[0].especie].carnivoro;
                if (carnivoro || animalNoRecintoEhCarnivoro) {
                    return recinto.animais.every(anim => anim.especie === animal);
                }
                // acrescenta um espaço ocupado caso haja outra espécie no recinto
                if (recinto.animais[0].especie != animal) {
                    recinto.espacoLivre -= 1;
                }
            }
            return true;
        });

        // verifica se animal é HIPOPOTAMO e se tem outro animal no recinto
        if (animal === 'HIPOPOTAMO') {
            biomaAdequado = biomaAdequado.filter(recinto => {
                if (recinto.animais.length > 0) {
                    return recinto.bioma === 'savana e rio';
                }
                return true;
            })
        }

        // não permite colocar um só MACACO sozinho sem outros animais
        if (animal === 'MACACO' && quantidade === 1) {
            biomaAdequado = biomaAdequado.filter(recinto => {
                return recinto.animais.length > 0;
            })
        }

        // cria a resposta no formato solicitado
        biomaAdequado.forEach(recinto => {
            recintosViaveis.push(
                `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre - (quantidade * tamanho)} total: ${recinto.tamanho})`
                )
        })

        // caso não exista recinto compatível gera resposta no formato solicitado
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável'};
        }

        return { recintosViaveis };

    }

}

export { RecintosZoo as RecintosZoo };
