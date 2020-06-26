/* eslint-env jest */
import React from 'react';
import Index from '../../pages/index';
import blogListFixture from '../fixtures/blog-list-one-blog.json';
import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock('react-instantsearch-dom/server', () => ({
  findResultsState: jest.fn()
}));

jest.mock('react-instantsearch-dom', () => ({
  ...jest.requireActual('react-instantsearch-dom'),
  connectStateResults: templateFn => params => templateFn(params)
}));

jest.mock('algoliasearch', () => jest.fn().mockImplementation(() => ({ search: jest.fn() })));

describe('Index', () => {
  beforeEach(() => {
    process.env.ALGOLIA_APPLICATION_ID = 'algolia-app-id';
    process.env.ALGOLIA_API_KEY = 'algolia-search-key';
    process.env.ALGOLIA_PRODUCTION_INDEX_NAME = 'algolia-index-name';
    process.env.DYNAMIC_CONTENT_REFERENCE_ID = 'reference-id';
    process.env.GA_TRACKING_ID = 'ga-tracking-id';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('components', () => {
    it('should render index', async () => {
      const component = ShallowRenderer.createRenderer();
      component.render(<Index {...blogListFixture} />);
      expect(component.getRenderOutput()).toMatchSnapshot();
    });
  });
});
