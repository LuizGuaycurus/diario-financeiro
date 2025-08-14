# 📖 Diário Financeiro Pessoal - Aplicação Full-Stack

> Uma aplicação web completa para gerenciamento financeiro pessoal, permitindo o controle de receitas e despesas. Este projeto foi desenvolvido como um estudo prático de tecnologias modernas de desenvolvimento web, incluindo Node.js, React, Prisma e Tailwind CSS.

---

##  Funcionalidades Principais

* **Gerenciamento de Transações:** Funcionalidade completa de **CRUD** (_Create, Read, Update, Delete_) para registros de receitas e despesas.
* **Interface Interativa:** Permite adicionar e remover transações diretamente pela interface, com **atualização automática** da tela.
* **Dashboard Analítico:** Um painel central que exibe o **saldo atual em tempo real**, consolidando os totais de receitas e despesas.
* **Design Responsivo:** Interface de usuário moderna e limpa, construída com **Tailwind CSS** para uma experiência otimizada em desktops e dispositivos móveis.

---

## 🚀 Pilha Tecnológica

### Back-end
* **Node.js:** Ambiente de execução para JavaScript no servidor.
* **Express.js:** Framework para a construção da API RESTful.
* **Prisma:** ORM para a interação com o banco de dados.
* **SQLite:** Banco de dados relacional utilizado no ambiente de desenvolvimento.

### Front-end
* **React:** Biblioteca para a construção de interfaces de usuário.
* **Vite:** Ferramenta de build de alta performance.
* **Tailwind CSS:** Framework CSS utility-first.
* **Axios:** Cliente HTTP para a comunicação com a API.

---

## ⚙️ Execução Local

Para executar o projeto em um ambiente de desenvolvimento local, siga as instruções abaixo.

### Pré-requisitos
* [**Node.js**](https://nodejs.org/en/) (versão LTS recomendada)
* [**Git**](https://git-scm.com/)

### Instruções de Instalação
1.  **Clone o repositório:**
    ```bash
    git clone github.com/LuizGuaycurus/diario-financeiro.git
    cd diario-financeiro
    ```

2.  **Inicialização do Back-end:**
    ```bash
    # Navegue até a pasta do back-end
    cd backend
    
    # Instale as dependências
    npm install
    
    # Crie o banco de dados e aplique as migrações
    npx prisma migrate dev
    
    # Inicie o servidor do back-end (padrão: porta 3000)
    npm run dev
    ```
    > **Atenção:** Mantenha este terminal em execução e utilize um novo terminal para o front-end.

3.  **Inicialização do Front-end:**
    ```bash
    # Em um novo terminal, a partir da pasta raiz, navegue até o front-end
    cd frontend
    
    # Instale as dependências
    npm install
    
    # Inicie o servidor de desenvolvimento (padrão: porta 5173)
    npm run dev
    ```

4.  Acesse `http://localhost:5173` em seu navegador para visualizar a aplicação.

---

## 📡 Endpoints da API

A API expõe os seguintes endpoints para manipulação de dados:

| Método | Endpoint        | Descrição                      |
| :----- | :-------------- | :----------------------------- |
| `POST` | `/despesas`     | Adiciona uma nova despesa.     |
| `GET`  | `/despesas`     | Retorna todas as despesas.     |
| `GET`  | `/despesas/:id` | Retorna uma despesa específica. |
| `PUT`  | `/despesas/:id` | Atualiza uma despesa.          |
| `DELETE`| `/despesas/:id` | Remove uma despesa.            |
| `POST` | `/receitas`     | Adiciona uma nova receita.     |
| `GET`  | `/receitas`     | Retorna todas as receitas.     |
| `GET`  | `/receitas/:id` | Retorna uma receita específica. |
| `PUT`  | `/receitas/:id` | Atualiza uma receita.          |
| `DELETE`| `/receitas/:id` | Remove uma receita.            |

---

## 👤 Autor

Desenvolvido por **Luiz Gustavo Guaycurus Goulart**.

* **LinkedIn:** `https://www.linkedin.com/in/luizguaycurus/`
* **GitHub:** `https://github.com/luizguaycurus`

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**. Veja o arquivo `LICENSE` no repositório para mais detalhes.