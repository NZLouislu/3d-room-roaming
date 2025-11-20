import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InfoCard } from './InfoCard';
import { useStore } from '../../hooks/useStore';

// Mock Zustand
vi.mock('../../hooks/useStore', () => ({
  useStore: vi.fn(),
}));

describe('InfoCard', () => {
  it('renders nothing when no object is selected', () => {
    (useStore as any).mockImplementation((selector: any) => selector({
      selectedObject: null,
      setSelectedObject: vi.fn(),
    }));

    const { container } = render(<InfoCard />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders object details when selected', () => {
    (useStore as any).mockImplementation((selector: any) => selector({
      selectedObject: { name: 'Test Chair', price: '$50', description: 'A nice chair' },
      setSelectedObject: vi.fn(),
    }));

    render(<InfoCard />);
    expect(screen.getByText('Test Chair')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('A nice chair')).toBeInTheDocument();
  });

  it('calls setSelectedObject(null) when close button is clicked', () => {
    const setSelectedObject = vi.fn();
    (useStore as any).mockImplementation((selector: any) => selector({
      selectedObject: { name: 'Test Chair', price: '$50', description: 'A nice chair' },
      setSelectedObject,
    }));

    render(<InfoCard />);
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(setSelectedObject).toHaveBeenCalledWith(null);
  });
});
