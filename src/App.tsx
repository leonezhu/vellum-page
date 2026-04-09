import { useRef } from 'react';
import { Header } from './components/Header';
import { Sidebar, Section } from './components/Sidebar';
import { ContentInput } from './components/ContentInput';
import { StyleSelector } from './components/StyleSelector';
import { TemplateSelector } from './components/TemplateSelector';
import { PlatformSelector } from './components/PlatformSelector';
import { CardPreview } from './components/CardPreview';

export default function App() {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          <Section title="Content" defaultOpen={true}>
            <ContentInput />
          </Section>
          <Section title="Style" defaultOpen={true}>
            <StyleSelector />
          </Section>
          <Section title="Layout" defaultOpen={true}>
            <TemplateSelector />
          </Section>
          <Section title="Platform" defaultOpen={false}>
            <PlatformSelector />
          </Section>
        </Sidebar>
        <CardPreview cardRef={cardRef} />
      </div>
    </div>
  );
}
