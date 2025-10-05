# 🤖 Regras de Desenvolvimento para Dyad AI

Este documento descreve a pilha de tecnologia e as diretrizes para o desenvolvimento e manutenção do aplicativo "Cronograma USF Apipucos" usando o Dyad AI.

## 🚀 Pilha de Tecnologia

O aplicativo será desenvolvido utilizando as seguintes tecnologias e bibliotecas:

*   **React**: Para construir a interface de usuário de forma declarativa e baseada em componentes.
*   **TypeScript**: Para adicionar tipagem estática ao JavaScript, melhorando a robustez e a manutenibilidade do código.
*   **Tailwind CSS**: Um framework CSS utilitário para estilização rápida e responsiva dos componentes.
*   **shadcn/ui**: Uma coleção de componentes de UI reutilizáveis e acessíveis, construídos sobre Radix UI e estilizados com Tailwind CSS.
*   **React Router**: Para gerenciar a navegação e as rotas da aplicação de forma eficiente.
*   **Lucide React**: Uma biblioteca de ícones moderna e personalizável para uso em toda a aplicação.
*   **Progressive Web App (PWA)**: Utilizando Service Workers e Web App Manifest para funcionalidades offline e instalabilidade.
*   **LocalStorage API**: Para persistência de dados no lado do cliente, como o cronograma editado e configurações de cores.
*   **Geração de CSV**: Funcionalidade para exportar dados da tabela para o formato CSV.

## 📚 Regras de Uso de Bibliotecas e Estrutura

Para garantir consistência, manutenibilidade e boas práticas, siga estas regras:

*   **Estrutura de Pastas**:
    *   Todo o código-fonte deve residir na pasta `src/`.
    *   Páginas principais devem ser colocadas em `src/pages/`.
    *   Componentes reutilizáveis devem ser colocados em `src/components/`.
    *   O ponto de entrada principal da aplicação (página padrão) é `src/pages/Index.tsx`.
*   **Componentes React**:
    *   Sempre crie um novo arquivo para cada novo componente ou hook, independentemente do tamanho.
    *   Evite adicionar novos componentes a arquivos existentes.
    *   Mantenha os componentes pequenos e focados, idealmente com menos de 100 linhas de código.
    *   Utilize o estado e os hooks do React para gerenciar a lógica e o ciclo de vida dos componentes.
*   **Estilização**:
    *   Utilize **exclusivamente Tailwind CSS** para toda a estilização. Evite CSS inline ou arquivos CSS personalizados, a menos que seja estritamente necessário para overrides específicos de bibliotecas.
    *   Priorize classes utilitárias do Tailwind para layout, espaçamento, cores, tipografia e responsividade.
*   **Componentes UI**:
    *   Sempre que possível, utilize os componentes pré-construídos da biblioteca **shadcn/ui**. Eles já vêm com acessibilidade e estilização Tailwind.
    *   Não edite os arquivos dos componentes `shadcn/ui` diretamente. Se precisar de uma variação, crie um novo componente que envolva ou estenda o componente `shadcn/ui`.
*   **Tipagem**:
    *   Utilize **TypeScript** para definir interfaces e tipos para props de componentes, estados e dados, garantindo segurança de tipo em toda a aplicação.
*   **Roteamento**:
    *   Utilize **React Router** para todas as necessidades de navegação. As rotas principais devem ser definidas em `src/App.tsx`.
*   **Ícones**:
    *   Utilize a biblioteca **Lucide React** para todos os ícones na aplicação.
*   **Manipulação de Dados**:
    *   Para persistência de dados no lado do cliente, utilize a **LocalStorage API**.
    *   Evite manipulação direta do DOM (ex: `document.getElementById`, `innerHTML`) dentro dos componentes React; use o estado do React e referências (`useRef`) quando necessário.
*   **PWA**:
    *   Mantenha e aprimore a funcionalidade PWA existente, incluindo o Service Worker (`sw.js`) e o Manifest (`manifest.json`).
*   **Geração de CSV**:
    *   A funcionalidade de exportação para CSV deve ser mantida e, se necessário, adaptada para a estrutura React.