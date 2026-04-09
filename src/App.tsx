import { useRef, useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, Section } from './components/Sidebar';
import { ContentInput } from './components/ContentInput';
import { StyleSelector } from './components/StyleSelector';
import { TemplateSelector } from './components/TemplateSelector';
import { PlatformSelector } from './components/PlatformSelector';
import { CardPreview } from './components/CardPreview';

export default function App() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Header onToggleSidebar={() => setSidebarOpen((o) => !o)} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-30 w-80 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
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
        </div>

        <CardPreview cardRef={cardRef} />
      </div>
    </div>
  );
}
