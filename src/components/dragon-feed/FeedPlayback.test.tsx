// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FeedPost } from './FeedPost';
import { FeedTile } from './FeedTile';
import { FeedViewer } from './FeedViewer';
import { FeedViewerVideo } from './FeedViewerVideo';
import type { PortfolioMedia } from '@/hooks/useUniqueCreatorPortfolio';

vi.mock('@/hooks/useFeedLike', () => ({ useFeedLike: () => ({ liked: false, toggleLike: vi.fn() }) }));
vi.mock('@/hooks/useMessageCreator', () => ({ useMessageCreator: () => ({ messageCreator: vi.fn() }) }));
vi.mock('@/hooks/useRecordFeedView', () => ({ useRecordFeedView: () => vi.fn() }));
// Carousel geometry is outside this playback regression; keep the real Radix portal.
vi.mock('embla-carousel-react', () => ({ default: () => [vi.fn(), undefined] }));

const media: PortfolioMedia = {
  id: 'video', url: 'https://example.com/portfolio.mov?token=example', type: 'video',
  creatorId: 'creator', creatorName: 'Test Creator', creatorSlug: 'test-creator',
};

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe.each([['mobile post', FeedPost], ['desktop tile', FeedTile]] as const)('%s preview', (_name, Component) => {
  it('requests a preview frame and exits loading when Safari only supplies metadata', () => {
    render(<MemoryRouter><Component media={media} onOpen={vi.fn()} /></MemoryRouter>);
    const video = screen.getByLabelText('Video by Test Creator') as HTMLVideoElement;
    Object.defineProperty(video, 'duration', { value: 9.46 });
    fireEvent.loadedMetadata(video);
    expect(video.currentTime).toBeGreaterThan(0);
    expect(video.currentTime).toBeLessThan(9.46);
    expect(screen.queryByText('Loading content...')).toBeNull();
    expect(screen.getByText('0:09')).toBeTruthy();
  });
});

it('starts the video when the real dialog portal mounts it', async () => {
  render(<MemoryRouter><FeedViewer items={[media]} index={0} onIndexChange={vi.fn()} onClose={vi.fn()} /></MemoryRouter>);
  const video = await screen.findByLabelText('Video by Test Creator');
  await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
  expect(video.hasAttribute('controls')).toBe(true);
});

it('pauses the previous video when the viewer moves to another item', async () => {
  const second = { ...media, id: 'second', creatorName: 'Second Creator', url: 'https://example.com/second.mp4' };
  const { rerender } = render(<MemoryRouter><FeedViewer items={[media, second]} index={0} onIndexChange={vi.fn()} onClose={vi.fn()} /></MemoryRouter>);
  const firstVideo = await screen.findByLabelText('Video by Test Creator');
  const secondVideo = await screen.findByLabelText('Video by Second Creator');
  vi.mocked(HTMLMediaElement.prototype.play).mockClear();
  vi.mocked(HTMLMediaElement.prototype.pause).mockClear();
  rerender(<MemoryRouter><FeedViewer items={[media, second]} index={1} onIndexChange={vi.fn()} onClose={vi.fn()} /></MemoryRouter>);
  expect(vi.mocked(HTMLMediaElement.prototype.pause).mock.contexts).toContain(firstVideo);
  expect(vi.mocked(HTMLMediaElement.prototype.play).mock.contexts).toContain(secondVideo);
});

it('keeps manual controls when autoplay is blocked and reports media failures', async () => {
  vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(new DOMException('Blocked', 'NotAllowedError'));
  render(<MemoryRouter><FeedViewer items={[media]} index={0} onIndexChange={vi.fn()} onClose={vi.fn()} /></MemoryRouter>);
  const video = await screen.findByLabelText('Video by Test Creator') as HTMLVideoElement;
  await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
  expect(video.controls).toBe(true);
  fireEvent.error(video);
  expect(screen.getByRole('alert').textContent).toContain('couldn’t load');
});

it('preserves a preloaded media error when the same video becomes active', () => {
  const { rerender } = render(<FeedViewerVideo media={media} active={false} />);
  fireEvent.error(screen.getByLabelText('Video by Test Creator'));
  rerender(<FeedViewerVideo media={media} active />);
  expect(screen.getByRole('alert').textContent).toContain('couldn’t load');
  fireEvent.loadedData(screen.getByLabelText('Video by Test Creator'));
  expect(screen.queryByRole('alert')).toBeNull();
});

it('lets native video controls seek without triggering carousel navigation', async () => {
  const change = vi.fn();
  const close = vi.fn();
  render(<MemoryRouter><FeedViewer items={[media, { ...media, id: 'second' }]} index={0} onIndexChange={change} onClose={close} /></MemoryRouter>);
  const videos = await screen.findAllByLabelText('Video by Test Creator');
  fireEvent.keyDown(videos[0], { key: 'ArrowRight' });
  expect(change).not.toHaveBeenCalled();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(change).toHaveBeenCalledWith(1);
  fireEvent.keyDown(videos[0], { key: 'Escape' });
  expect(close).toHaveBeenCalled();
});
