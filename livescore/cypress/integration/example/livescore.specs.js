describe('it should open live score app and view home section', ()=>{

    beforeEach(() =>{
        cy.visit('/')
    });

    it('', () => {
        cy.wait(4000)
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/'));
    })
})

describe('it should navigate and view Dashboard', ()=>{

    beforeEach(() =>{
        cy.visit('/')
    });

    it('', () => {
        cy.wait(4000)
        cy.get('.dashboardNav').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/dashboard'));
    })
})

describe('it should locate headers and navigate to Login', ()=>{

    beforeEach(() =>{
        cy.visit('/')
    });

    it('', () => {
        cy.wait(4000)
        cy.get('.loginNav').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/login'));
    })
})

describe('it should login and navigate to home', ()=>{

    beforeEach(() =>{
        cy.visit('/')
    });

    it('', () => {
        cy.get('.loginNav').click();
        cy.wait(4000);
        cy.get('#username').type('cmeher196');
        cy.get('#password').type('helloworld');
        cy.wait(4000);
        cy.get('#loginbtn').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/'));
        cy.wait(4000);
        cy.get('.sign-out').click();
    })
})
describe('it should view live score of Cricket', ()=>{

    beforeEach(() =>{
        cy.visit('/')
    });

    it('', () => {
        cy.get('#cricket').click({ force: true })
        cy.wait(4000);
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/dashboard'));

    })
})

describe('it should view live score of Soccer', ()=>{

    beforeEach(() =>{
        cy.visit('/')
    });

    it('', () => {
        cy.get('#soccer').click({ force: true });
        cy.wait(4000);
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/dashboard'));

    })
})

describe('it should view live score of Badminton', ()=>{

    beforeEach(() =>{
        cy.visit('/')
    });

    it('', () => {
        cy.get('#badminton').click({ force: true })
        cy.wait(4000);
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/dashboard'));

    })
})

describe('it should login and Log out', ()=>{

    beforeEach(() =>{
        cy.visit('/')
    });

    it('', () => {
        cy.wait(4000)
        cy.get('.loginNav').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/login'));

        cy.get('#username').type('cmeher196');
        cy.get('#password').type('helloworld');
        cy.wait(4000);
        cy.get('#loginbtn').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/'));
        cy.wait(4000);
        cy.get('.sign-out').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/login'));

    })
})

describe('it should login and view a favourite', ()=>{

    beforeEach(() =>{
        cy.visit('/')
    });

    it('', () => {
        cy.get('.loginNav').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/login'));
        cy.wait(4000);
        cy.get('#username').type('cmeher196');
        cy.get('#password').type('helloworld');
        cy.wait(4000);
        cy.get('#loginbtn').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/'));
        cy.wait(4000);
        
        cy.get('#favNav').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/favourites'));
        cy.wait(4000);

        // cy.get('#match').contains('Match').then(el => {
        //     cy.contains('#deleteFav').click()
        cy.scrollTo('bottom');
        cy.wait(4000);
        cy.scrollTo('top');
        cy.wait(4000);
        cy.get('.sign-out').click();

        })
})

describe('it should login, view a favourite and delete it', ()=>{

    beforeEach(() =>{
        cy.visit('/')
    });

    it('', () => {

        cy.get('.loginNav').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/login'));
        cy.wait(4000);

        cy.get('#username').type('cmeher196');
        cy.get('#password').type('helloworld');
        cy.wait(4000);
        cy.get('#loginbtn').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/'));
        cy.wait(4000);
        
        cy.get('#favNav').click();
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/favourites'));
        cy.wait(4000);


        cy.get('.card').first().within(()=>{
            cy.get('#deleteFav').click()
        })

        cy.wait(4000);
        cy.get('#modal_button').click();
        cy.wait(4000);
        cy.get('.sign-out').click();
        cy.wait(4000);
        cy.location().should((location) => expect(location.href).to.eq('http://localhost:3000/login'))
        })
})

