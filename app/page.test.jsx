import { render, screen } from '@testing-library/react';
import Page from './page.jsx';

describe('Page', () => {
  it("renders portfolio header", () => {
    render(<Page />);
    expect(screen.getByText(/This is saiten's Portfolio/i)).toBeInTheDocument();
  });
});

