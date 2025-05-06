// -> Importando 'readFile' & 'writeFile' do módulo 'fs/promises' para manipulação de arquivos de forma assíncrona
import { readFile, writeFile } from 'fs/promises'; // Importando o módulo 'fs/promises' para manipulação de arquivos de forma assíncrona

// -> Importando o módulo 'prompt-sync' para capturar entradas do usuário no terminal
import PromptSync from "prompt-sync";
const prompt = PromptSync(); // Inicializando o prompt-sync

// -> Variável com o caminho até o arquivo JSON onde as tarefas serão armazenadas
const filePath = './jsons/tarefas.json';

// -> Função para ler o arquivo JSON
export async function readFileJSON() {
    try {
        // Lê o conteúdo do arquivo no formato de texto
        const data = await readFile(filePath, 'utf-8');
        // Converte o texto lido para um objeto JavaScript e o retorna
        return JSON.parse(data);
    } catch (error) {
        // Exibe uma mensagem de erro caso ocorra algum problema ao ler o arquivo
        console.log(`
            Erro ao tentar ler o arquivo JSON:
            -> Tipo do erro: ${error.name}
            -> Mensagem: ${error.message}
        `);
        return []; // Retorna uma lista vazia caso o arquivo não seja encontrado ou ocorra um erro
    }
}

// -> Função para escrever no arquivo JSON
export async function writeFileJSON(listaTarefas) {
    try {
        // Converte o objeto JavaScript para texto no formato JSON e escreve no arquivo
        await writeFile(filePath, JSON.stringify(listaTarefas, null, 2));
        console.log(`
            ------------------------------
            |     Arquivo atualizado!    |
            ------------------------------
        `);
    } catch (error) {
        // Exibe uma mensagem de erro caso ocorra algum problema ao salvar no arquivo
        console.log(`
            Erro ao tentar salvar no arquivo JSON:
            -> Tipo do erro: ${error.name}
            -> Mensagem: ${error.message}
        `);
    }
}

// -> Função para criar uma nova tarefa
export async function createTask() {
    // Lê as tarefas existentes no arquivo JSON
    const tarefas = await readFileJSON();
    // Solicita ao usuário o título da nova tarefa
    const titulo = prompt('Digite o título da tarefa: ');
    // Solicita ao usuário a descrição da nova tarefa
    const descricao = prompt('Digite a descrição da tarefa: ');

    // Cria um novo objeto de tarefa com um ID único
    const newTask = {
        id: tarefas.length + 1, // Define o ID como o próximo número na sequência
        titulo: titulo, // Define o título da tarefa
        descricao: descricao, // Define a descrição da tarefa
        concluida: false // Define o status inicial como não concluída
    };

    // Adiciona a nova tarefa à lista de tarefas
    tarefas.push(newTask);
    // Salva a lista atualizada no arquivo JSON
    await writeFileJSON(tarefas);
    console.log(`
        ----------------------------------
        |   Tarefa criada com sucesso!   |
        ----------------------------------
    `);
}

// -> Função para listar todas as tarefas
export async function listTasks() {
    // Lê as tarefas existentes no arquivo JSON
    const tarefas = await readFileJSON();
    // Exibe todas as tarefas no console
    console.log(tarefas);
}

// -> Função para listar as tarefas concluídas
export async function tasksCompleted() {
    // Lê as tarefas existentes no arquivo JSON
    const tarefas = await readFileJSON();
    // Filtra as tarefas que estão marcadas como concluídas
    const concluidas = tarefas.filter(tarefa => tarefa.concluida === true);
    // Exibe as tarefas concluídas no console
    console.log(concluidas);

    // Caso não existam tarefas concluídas, exibe uma mensagem informativa
    if (concluidas.length === 0) {
        console.log('Nenhuma tarefa concluída foi encontrada.');
    }
}

// -> Função para listar as tarefas pendentes
export async function tasksNoCompleted() {
    // Lê as tarefas existentes no arquivo JSON
    const tarefas = await readFileJSON();
    // Filtra as tarefas que ainda não estão concluídas
    const naoConcluidas = tarefas.filter(tarefa => tarefa.concluida === false);
    // Exibe as tarefas pendentes no console
    console.log(naoConcluidas);

    // Caso não existam tarefas pendentes, exibe uma mensagem informativa
    if (naoConcluidas.length === 0) {
        console.log('Nenhuma tarefa pendente foi encontrada.');
    }
}

// -> Função para marcar uma tarefa como concluída
export async function concluirTarefa() {
    // Lê as tarefas existentes no arquivo JSON
    const tarefas = await readFileJSON();
    // Solicita ao usuário o ID da tarefa que deseja marcar como concluída
    const id = parseInt(prompt('Digite o ID da tarefa que deseja marcar como concluída: '));

    // Encontra a tarefa correspondente ao ID fornecido
    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if (!tarefa) {
        console.log('Tarefa não encontrada.');
        return;
    }

    // Marca a tarefa como concluída
    tarefa.concluida = true;

    console.log(`
        ----------------------------------------------------
        =>   Tarefa ${tarefa.id} foi marcada como concluída!   <=
        ----------------------------------------------------
    `);

    // Salva a lista atualizada no arquivo JSON
    await writeFileJSON(tarefas);
}