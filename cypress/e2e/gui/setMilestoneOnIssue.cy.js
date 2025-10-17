import { faker } from '@faker-js/faker';

const options = { env: { snapshotOnly: true } }

describe('Set Milestone on Issue', options, () => {
    const issue = {
        title: `Issue to set milestone ${faker.string.uuid()}`,
        description: faker.lorem.words(3),
        project: {
            name: `project-${faker.string.uuid()}`,
            description: faker.lorem.words(5)
        }
    };

    const milestone = {
        title: `milestone ${faker.lorem.word()}`,
    };

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createMilestone(response.body.project_id, milestone)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    });

    it('successfully', () => {
        cy.gui_setMilestoneOnIssue(milestone)

        cy.get('.block.milestone').should('contain', milestone.title)
    })
});
