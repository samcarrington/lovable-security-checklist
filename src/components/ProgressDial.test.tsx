import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressDial from './ProgressDial';

describe('ProgressDial', () => {
  test('renders with 0% progress', () => {
    render(<ProgressDial percentage={0} />);
    
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  test('renders with 50% progress', () => {
    render(<ProgressDial percentage={50} />);
    
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  test('renders with 100% progress', () => {
    render(<ProgressDial percentage={100} />);
    
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  test('clamps percentage below 0 to 0', () => {
    render(<ProgressDial percentage={-10} />);
    
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  test('clamps percentage above 100 to 100', () => {
    render(<ProgressDial percentage={150} />);
    
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  test('rounds decimal percentages', () => {
    render(<ProgressDial percentage={33.7} />);
    
    expect(screen.getByText('34%')).toBeInTheDocument();
  });

  test('applies red color for low progress (< 33%)', () => {
    render(<ProgressDial percentage={20} />);
    
    const percentageText = screen.getByText('20%');
    expect(percentageText).toHaveClass('text-red-500');
  });

  test('applies amber color for medium progress (33-65%)', () => {
    render(<ProgressDial percentage={50} />);
    
    const percentageText = screen.getByText('50%');
    expect(percentageText).toHaveClass('text-amber-500');
  });

  test('applies green color for high progress (>= 66%)', () => {
    render(<ProgressDial percentage={80} />);
    
    const percentageText = screen.getByText('80%');
    expect(percentageText).toHaveClass('text-green-500');
  });

  test('renders small size correctly', () => {
    const { container } = render(<ProgressDial percentage={50} size="sm" />);
    
    const dial = container.firstChild;
    expect(dial).toHaveClass('w-24', 'h-24');
  });

  test('renders medium size by default', () => {
    const { container } = render(<ProgressDial percentage={50} />);
    
    const dial = container.firstChild;
    expect(dial).toHaveClass('w-32', 'h-32');
  });

  test('renders large size correctly', () => {
    const { container } = render(<ProgressDial percentage={50} size="lg" />);
    
    const dial = container.firstChild;
    expect(dial).toHaveClass('w-40', 'h-40');
  });

  test('applies custom className', () => {
    const { container } = render(
      <ProgressDial percentage={50} className="custom-class" />
    );
    
    const dial = container.firstChild;
    expect(dial).toHaveClass('custom-class');
  });

  test('has correct accessibility attributes', () => {
    render(<ProgressDial percentage={75} />);
    
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(progressbar).toHaveAttribute('aria-label', 'Progress: 75%');
  });
});
