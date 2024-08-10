import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page';
import axios from 'axios';
import { saveAs } from 'file-saver';

jest.mock('axios');
jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
jest.mock('@/components/ChartShowCase', () => ({
  ChartShowcase: () => <div data-testid="chart-showcase">Chart Showcase</div>
}));
jest.mock('@/components/Panel', () => ({
  Panel: () => <div data-testid="panel">Panel</div>
}));

describe('Home Component', () => {
  beforeEach(() => {
    (axios.get).mockResolvedValue({ data: { data: { '3.5': 10, '4.0': 20 } } });
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByText('Interest Rate Overview')).toBeInTheDocument();
    expect(screen.getByTestId('chart-showcase')).toBeInTheDocument();
  });

  // it('displays loading state initially', async () => {
  //   await act(async () => {
  //     render(<Home />);
  //   });
  //   expect(screen.getByTestId('loader')).toBeInTheDocument();
  // });

  it('renders Download Chart button', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByText('Download Chart')).toBeInTheDocument();
  });

  it('displays no data available message when data is empty', async () => {
    (axios.get).mockResolvedValue({ data: { data: {} } });
    await act(async () => {
      render(<Home />);
    });
    await waitFor(() => {
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });

  it('renders Panel component', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByTestId('panel')).toBeInTheDocument();
  });

  it('fetches data on initial render', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(axios.get).toHaveBeenCalledWith('/api/rate', expect.any(Object));
  });

  it('downloads chart when Download Chart button is clicked', async () => {
    await act(async () => {
      render(<Home />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Download Chart'));
    });
    expect(saveAs).toHaveBeenCalled();
  });
});