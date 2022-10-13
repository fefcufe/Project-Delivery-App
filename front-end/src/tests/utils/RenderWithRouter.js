import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component, route = '/') => {
  const customHistory = createMemoryHistory({
    initialEntries: [route],
  });
  const allSelectors = render(
    <Router
      location={ customHistory.location }
      navigator={ customHistory }
    >
      { component }
    </Router>,
  );

  return { ...allSelectors, customHistory };
};

export default renderWithRouter;
