/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
import fazCheckoutPage from "../support/page_objects/fazCheckout.page";
import { faker } from "@faker-js/faker";

context("Exercicio - Testes End-to-end - Fluxo de pedido", () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final 
  */

    beforeEach(() => {
        cy.visit("produtos/");
    
    });

    it("Deve fazer um pedido na loja Ebac Shop de ponta a ponta - Cria novo usuário", function () {
        const quantidadeProdutos = 1; // Define a quantidade de produtos conforme o cenário
        const nome = faker.person.firstName(); // Gera um nome aleatório
        const sobrenome = faker.person.lastName(); // Gera um sobrenome aleatório
        const email = faker.internet.email(nome, sobrenome); // Gera um email aleatório
        const senha = faker.internet.password(); // Gera uma senha aleatória
        const comentario = faker.lorem.sentence(20); // Gera um comentário aleatório

    // Adiciona os produtos ao carrinho de acordo com a quantidade definida
    cy.fixture('produtos').then(dados => {
        dados.slice(0, quantidadeProdutos).forEach(produto => {
            produtosPage.buscarProduto(produto.nomeProduto);
            produtosPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade);
            
        });
    });

    // Realiza o checkout
    cy.fixture('checkout').then(dados => {
        fazCheckoutPage.checkoutSemLogin(nome, sobrenome, dados.empresa, dados.pais, dados.endereco, dados.complemento, dados.cidade, dados.estado, dados.cep, dados.telefone, email, senha, comentario);
    });
    
    // Valida se o pedido foi concluído com sucesso
    cy.get('.page-title').should('be.visible').and('contain', 'Pedido recebido');
    });


    it("Deve fazer um pedido na loja Ebac Shop de ponta a ponta - Faz Login", function () {
        const quantidadeProdutos = 1; // Define a quantidade de produtos conforme o cenário
        const comentario = faker.lorem.sentence(20); // Gera um comentário aleatório

    // Adiciona os produtos ao carrinho de acordo com a quantidade definida
    cy.fixture('produtos').then(dados => {
        dados.slice(0, quantidadeProdutos).forEach(produto => {
            produtosPage.buscarProduto(produto.nomeProduto);
            produtosPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade);
            
        });
    });

    // Acessa a página de checkout
    cy.get('#cart > .dropdown-toggle').click();
    cy.get('.checkout').eq(1).click();
    cy.get('.showlogin').click();
    
    // Realiza o login
    cy.fixture('perfil').then(dados => {
        cy.login(dados.usuario, dados.senha);
    });

    fazCheckoutPage.checkoutComLogin(comentario);
    
    // Valida se o pedido foi concluído com sucesso
    cy.get('.page-title').should('be.visible').and('contain', 'Pedido recebido');
    });


});