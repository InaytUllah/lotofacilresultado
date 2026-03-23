interface SEOContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function SEOContent({ children, className = '' }: SEOContentProps) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}
