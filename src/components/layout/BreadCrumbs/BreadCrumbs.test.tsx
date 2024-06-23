import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BreadCrumbs } from './BreadCrumbs';

test('renders home breadcrumb', () => {
  const { getByText } = render(<BreadCrumbs />, { wrapper: MemoryRouter });
  const homeBreadcrumb = getByText('Home');
  expect(homeBreadcrumb).toBeInTheDocument();
});

test('renders correct breadcrumbs for nested route', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/products/123']}>
      <BreadCrumbs />
    </MemoryRouter>
  );

  const homeBreadcrumb = getByText('Home');
  const productsBreadcrumb = getByText('products');

  expect(homeBreadcrumb).toBeInTheDocument();
  expect(productsBreadcrumb).toBeInTheDocument();
});
