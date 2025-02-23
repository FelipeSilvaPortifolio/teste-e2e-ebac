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

    it("Deve fazer um pedido na loja Ebac Shop de ponta a ponta", function () {
        const quantidadeProdutos = 4; // Define a quantidade de produtos conforme o cenário
        const nome = faker.person.firstName();
        const sobrenome = faker.person.lastName();
        const email = faker.internet.email(nome, sobrenome);
        const senha = faker.internet.password();

    // Adiciona os produtos ao carrinho
    cy.fixture('produtos').then(dados => {
        dados.slice(0, quantidadeProdutos).forEach(produto => {
            produtosPage.buscarProduto(produto.nomeProduto);
            produtosPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade);
            
        });
    });

    // Realiza o checkout
    cy.fixture('checkout').then(dados => {
        fazCheckoutPage.checkout(nome, sobrenome, dados.empresa, dados.pais, dados.endereco, dados.complemento, dados.cidade, dados.estado, dados.cep, dados.telefone, email, senha, dados.comentario);
    });
    
    // Valida se o pedido foi concluído com sucesso
    cy.get('.page-title').should('be.visible').and('contain', 'Pedido recebido');
    });
});