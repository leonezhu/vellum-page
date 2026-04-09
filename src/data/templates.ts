import type { CardTemplate, TemplateId } from '../types/card';

export const templates: CardTemplate[] = [
  {
    id: 'centered',
    name: '居中',
    description: '文本居中排列，适合引用和公告',
    supportedAspects: ['16:9', '1:1', '4:5', '3:4', '9:16', '3:2'],
  },
  {
    id: 'split-horizontal',
    name: '分栏',
    description: '左文右装饰，适合宽屏展示',
    supportedAspects: ['16:9', '3:2'],
  },
  {
    id: 'vertical-stack',
    name: '堆叠',
    description: '垂直堆叠，适合竖屏长图',
    supportedAspects: ['4:5', '3:4', '9:16', '1:1'],
  },
  {
    id: 'editorial',
    name: '杂志',
    description: '大标题主导的杂志风格',
    supportedAspects: ['16:9', '3:2', '1:1', '4:5'],
  },
  {
    id: 'minimal',
    name: '极简',
    description: '仅标题+元信息，极致简约',
    supportedAspects: ['16:9', '1:1', '3:2'],
  },
];

export function getTemplate(id: TemplateId): CardTemplate {
  return templates.find((t) => t.id === id) ?? templates[0];
}

export function getAspect(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const d = gcd(width, height);
  return `${width / d}:${height / d}`;
}
