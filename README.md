# Desafio SoftWrap - Dev Pleno 👨‍🔧

Este repo é o resultado do desafio de React JS para Pleno! O teste resume-se em desenvolver um CRUD básico(Create, Read, Update) para uma aplicação de cadastro de pessoas.

## Escolha das techs 🤖
A Stack deveria se resumir em ReactJS em sua última versão, e o restante, apenas preferências. As outras techs que utilizei, visando um desenvolvimento mais veloz e padronizado foram:
* Typescript: Tipagem estática, auxiliou em vários pontos do desenvolvimento evitando resultados inesperados. Também era recomendado pela empresa.
* ESLint: Padronização do código, estava um pouco por fora das novas especificações do React que, por exemplo, permitem que um arquivo não importe o React, apesar de isto ser pouco legível e intuitivo. Também indicado pela empresa.
* Styled-Components: Facilidade na implementação de CSS, escolhi pela modularidade e também por ter alguma familiaridade com a ferramenta, também era indicado pela empresa.
* React-Bootstrap: Considerei utilizar CSS Puro, porém devido as especificações de design vistas no mockup passado pelo Figma, resolvi aceitar o desafio de utilizar esta recomendação, também já conhecia o BootStrap desde sua versão 4, então não foi tão estranho.
* Next-JS: Principalmente as rotas mais fáceis 😊. Também escolhi para aplicar os conhecimentos que havia vindo absorvendo através da documentação.
* Firebase: Precisava de uma forma de implementar autenticação sem perder muito tempo. O Firebase auxiliou também com o banco de dados não relacional(FireStore) e a lógica de permissões para interação com o mesmo.
* Nookies: Abstração da API de Cookies. Utilizei para armazenar o cookie do FirebaseAuth de forma mais simples.

## Funcionalidades 🛠
O projeto consiste de uma tela inicial com um formulário de login que aceita Email e Senha, ao clicar no botão sign-up o usuário é cadastrado no firebase, ao clicar em login, o usuário acessa a aplicação. O botão Forgot Password não foi implementado.

Após feito o login, o usuário vê uma tela com uma tabela com os dados cadastrados e dois botões, anterior e próximo, permitindo navegar na coleção.

No NavBar, o botão `Visualizar` leva à página da table, e o botão `Novo Cadastro` leva até a página de cadastro, onde é apresentado o formulário com validações em html nativo.

Ainda na página da tabela, o botão editar leva até a página de cadastro, reutilizando o formulário, apenas preenchendo os dados e trocando o label do botão.

Por fim, ao clicar em Sign Out, o cookie é limpo, a página recarregada, e o usuário vê novamente a página de login.

As validações de cadastro apenas verificam se o nome está vazio, se a idade é maior que 0, e se o CPF está no formato XXX.XXX.XXX-XX.

## Processo 📃
Iniciei com outras ideias, sem a intenção de utilizar NextJS. Porém após a implementação do boilerplate e do design das páginas e algumas pausas para pensar, acabei optando por migrar. A migração foi tranquila, em maior parte consistiu em alterar a estruturação das pastas e adaptar alguns arquivos ao SSR e SSG. Durante o desenvolvimento acabei tomando algumas decisões erradas que acabaram tomando um pouco de tempo, como a utilização do Yup para validação do formulário, mas que acabaram sendo corrigidas no dia seguinte. A implementação da autenticação ocorreu após a migração, foi necessário ler alguns vários pontos da documentação para aplicar meus conhecimentos de Firebase com Flutter para o React. Após isso, iniciei a criação do CRUD com a paginação da página de READ, ainda aplicando conhecimentos prévios de Flutter a parte de criação e atualização foram aplicadas tranquilamente.

### Extras 🌟
Apesar de não solicitado, acabei realizando a integração com a API Localidades do IBGE para auto-preenchimento dos campos Estado e Cidade. E também realizei a implementação do botão de SignOut, apesar de ter sido extremamente simples e talvez não relevante.

## Consideração Finais 👨‍🏫
Esse teste foi muito útil para colocar em prática alguns conhecimentos que havia desenvolvido nos últimos anos e também para me ver capacitado como Pleno, mesmo que o resultado não tenha satisfeito por completo.
Tive algumas frustrações, em princípio com a validação dos formulários(onde houve a remoção do Yup) e após isso, com a paginação, onde o Chrome Remote Debug foi extremamente útil para entender o funcionamento do Firebase em relação as funções `limit`, `startAfter`, `endBefore`, `limitToLast`. E mesmo assim acabaram ocorrendo alguns bugs, como a cidade ser resetada durante a edição e alguns "últimos" registros da paginação não sendo renderizados e causando erros na página.
Infelizmente acredito não ter extraído o máximo do Typescript, pois priorizando o tempo acabei não tipando tudo que poderia ser tipado. Também não consegui implementar TDD até o final, mais por estar iniciando na metodologia agora e por não ter muita noção dos testes a serem realizados.
