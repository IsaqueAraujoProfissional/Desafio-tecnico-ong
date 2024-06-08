# Next.js News Portal

Este é um portal de notícias responsivo desenvolvido utilizando o framework Next.js. O site consome a API pública da NewsAPI para exibir as notícias mais recentes. Os usuários podem selecionar notícias dos EUA ou do Brasil e visualizar os detalhes completos de cada notícia.

## Funcionalidades

- **Página Inicial**: Exibe cartões das notícias com título, descrição, imagem, autor e data de publicação.
- **Página de Detalhes**: Mostra o título e o conteúdo completo da notícia, além de informações adicionais como autor e data de publicação.
- **Troca de País**: Botões na página inicial para selecionar notícias dos EUA ou do Brasil.
- **Carregamento Infinito**: Carregamento de mais notícias à medida que o usuário rola a página inicial.
- **Rotas Dinâmicas**: URLs dinâmicas que incluem o país e o ID do artigo.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/): Framework React para renderização do lado do servidor e geração de sites estáticos.
- [NewsAPI](https://newsapi.org/): API pública de notícias usada para buscar os dados das notícias.
- [CSS Modules](https://github.com/css-modules/css-modules): Utilizado para estilos locais e modulares.
- [Infinite Scroll](https://www.npmjs.com/package/react-infinite-scroll-component): Componente para implementação de carregamento infinito.

## Configuração e Execução

### Pré-requisitos

- Node.js (versão 18.17.x ou superior)
- npm (gerenciador de pacotes do Node)

### Passos para Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/IsaqueAraujoProfissional/Desafio-tecnico-ong.git
   cd Desafio-tecnico-ong

2. Instale as dependências na portal:
   
   cd portal
   npm install

3. Crie um arquivo .env.local na raiz do projeto e adicione sua chave de API da NewsAPI:

   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key

4. Execute o servidor de desenvolvimento:

   npm run dev

5. Abra o navegador e acesse http://localhost:3000 para ver a aplicação em funcionamento.