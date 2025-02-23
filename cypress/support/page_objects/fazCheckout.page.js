class checkoutPage {

    checkoutSemLogin(nome, sobrenome, empresa, pais, endereco, complemento, cidade, estado, cep, telefone, email, senha, comentario) {
        cy.get('#cart > .dropdown-toggle').click();
        cy.get('.checkout').eq(1).click();
        cy.get('#billing_first_name').type(nome);
        cy.get('#billing_last_name').type(sobrenome);
        cy.get('#billing_company').type(empresa);
        cy.get('#select2-billing_country-container').click();
        cy.get('.select2-search__field').type(pais + '{enter}');
        cy.get('#billing_address_1').type(endereco);
        cy.get('#billing_address_2').type(complemento);
        cy.get('#billing_city').type(cidade);
        cy.get('#select2-billing_state-container').click();
        cy.get('.select2-search__field').type(estado + '{enter}');
        cy.get('#billing_postcode').type(cep);
        cy.get('#billing_phone').type(telefone);
        cy.get('#billing_email').type(email);
        cy.get('#createaccount').check();
        cy.get('#account_password').type(senha);
        cy.get('#order_comments').type(comentario);
        cy.get('#payment_method_cheque').check();
        cy.get('#terms').check();
        cy.get('#place_order').click();
    }

    checkoutComLogin(comentario) {
        cy.get('#order_comments').type(comentario);
        cy.get('#payment_method_cheque').check();
        cy.get('#terms').check();
        cy.get('#place_order').click();
    }

}

export default new checkoutPage()