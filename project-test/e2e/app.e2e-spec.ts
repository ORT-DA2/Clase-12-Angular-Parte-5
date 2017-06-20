import { ProjectTestPage } from './app.po';

describe('project-test App', () => {
  let page: ProjectTestPage;

  beforeEach(() => {
    page = new ProjectTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
