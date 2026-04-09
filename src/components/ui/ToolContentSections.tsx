import type { ToolPageContent } from '@/lib/lotteryContent';

interface ToolContentSectionsProps {
  toolName: string;
  content: ToolPageContent;
}

export default function ToolContentSections({ toolName, content }: ToolContentSectionsProps) {
  return (
    <div className="space-y-8 mt-10">
      {/* How to use */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Como Usar o {toolName}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {content.howToUse}
        </p>
      </section>

      {/* FAQ */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Perguntas Frequentes sobre o {toolName}
        </h2>
        <div className="space-y-3">
          {content.faq.map((item, index) => (
            <details
              key={index}
              className="group rounded-lg border border-gray-100 bg-gray-50 transition-colors hover:border-gray-200"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 font-medium text-gray-800 [&::-webkit-details-marker]:hidden list-none">
                <span>{item.question}</span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-4 pb-4 text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Dicas para Usar Melhor
        </h2>
        <ul className="space-y-3">
          {content.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
