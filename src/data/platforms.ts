import type { PlatformPreset } from '../types/card';

export const platforms: PlatformPreset[] = [
  { id: 'twitter-16-9', name: 'Twitter/X', platform: 'twitter', width: 1200, height: 675, icon: '𝕏' },
  { id: 'twitter-1-1', name: 'Twitter/X 方形', platform: 'twitter', width: 1200, height: 1200, icon: '𝕏' },
  { id: 'instagram-1-1', name: 'Instagram', platform: 'instagram', width: 1080, height: 1080, icon: '📷' },
  { id: 'instagram-4-5', name: 'Instagram 竖版', platform: 'instagram', width: 1080, height: 1350, icon: '📷' },
  { id: 'xiaohongshu-3-4', name: '小红书', platform: 'xiaohongshu', width: 1080, height: 1440, icon: '📕' },
  { id: 'xiaohongshu-1-1', name: '小红书 方形', platform: 'xiaohongshu', width: 1080, height: 1080, icon: '📕' },
  { id: 'wechat-9-16', name: '微信朋友圈', platform: 'wechat', width: 1080, height: 1920, icon: '💬' },
  { id: 'linkedin-16-9', name: 'LinkedIn', platform: 'linkedin', width: 1200, height: 627, icon: '💼' },
  { id: 'general-3-2', name: '通用', platform: 'general', width: 1200, height: 800, icon: '🔲' },
];

export function getPlatform(id: string): PlatformPreset {
  return platforms.find((p) => p.id === id) ?? platforms[0];
}
