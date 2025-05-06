// Importando as funções auxiliares que serão usadas no menu
import { createTask, listTasks, tasksCompleted, tasksNoCompleted, concluirTarefa } from './auxiliando-com-funcoes.js';

// Importando o módulo prompt-sync para capturar entradas do usuário no terminal
import PromptSync from 'prompt-sync';
const prompt = PromptSync(); // Inicializando o prompt-sync

// Função assíncrona que exibe o menu interativo para o usuário
async function MenuForUser() {
    let opcao = ''; // Variável para armazenar a opção escolhida pelo usuário

    // Exibindo o menu interativo no console
    console.log(`
        /././././././././././././././././././././././././././././.
        |                    Menu Interativo                     ]
        | -> Escolha uma opção:                                  ]             
        | -> Digite o número de acordo com a opção que deseja:   ]
        | 1. Criar uma nova tarefa:                              ]
        | 2. Visualizar todas as tarefas:                        ]
        | 3. Visualizar apenas tarefas concluídas:               ]
        | 4. Visualizar apenas tarefas não concluídas:           ]
        | 5. Concluir uma tarefa:                                ]
        | 6. Sair:                                               ]
        /././././././././././././././././././././././././././././.    
        `);
        
    // Capturando a opção escolhida pelo usuário
    opcao = prompt('Digite a opção que deseja: ');

    // Estrutura de controle para executar a ação correspondente à opção escolhida
    switch(opcao) {
        case '1': 
            // Chama a função para criar uma nova tarefa
            await createTask();
            break;
        case '2': 
            // Chama a função para listar todas as tarefas
            await listTasks();
            break;
        case '3':
            // Chama a função para listar apenas as tarefas concluídas
            await tasksCompleted();
            break;
        case '4':
            // Chama a função para listar apenas as tarefas não concluídas
            await tasksNoCompleted();
            break;
        case '5': 
            // Chama a função para marcar uma tarefa como concluída
            await concluirTarefa();
            break;
        case '6':
            // Exibe uma mensagem de saída e encerra o programa
            console.log(`
                /./././././././././././././././././././
                |      Retirando-se do sistema!       |
                /./././././././././././././././././././
                |  Obrigado por usar nosso sistema!   |
                `);
            break;
        default:
            // Exibe uma mensagem de erro caso o usuário insira uma opção inválida
            console.log(`
                /./././././././././././././././././././
                |          Opção inválida!            |
                /./././././././././././././././././././
                |  Por favor, escolha uma opção válida. |
                `);
    }
}

// Chama a função para exibir o menu ao usuário
MenuForUser();