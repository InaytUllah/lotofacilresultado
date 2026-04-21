import { ReactNode } from 'react';

interface QuickAnswerProps {
  question: string;
  children: ReactNode;
  icon?: string;
}

/**
 * AEO (Answer Engine Optimization) component.
 *
 * Renders a prominent "Resposta Rápida" block at the top of a page — the exact
 * structure that Google, Bing, and generative search engines pull for featured
 * snippets, knowledge panels, and AI-generated answers. Uses `data-speakable`
 * so it's picked up by Speakable schema selectors and voice assistants.
 */
export default function QuickAnswer({
  question,
  children,
  icon = '💡',
}: QuickAnswerProps) {
  return (
    <aside
      className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-5 sm:p-6 my-6"
      aria-labelledby="quick-answer-title"
      data-speakable
    >
      <h2
        id="quick-answer-title"
        className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700 mb-2"
      >
        <span aria-hidden="true">{icon}</span>
        Resposta Rápida
      </h2>
      <p className="font-medium text-gray-900 mb-3">{question}</p>
      <div className="text-gray-700 leading-relaxed speakable">{children}</div>
    </aside>
  );
}
