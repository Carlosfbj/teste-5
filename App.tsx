import React, { useState } from 'react';
import Header from './components/Header';
import NewsInput from './components/NewsInput';
import VerificationResult from './components/VerificationResult';
import { verifyNewsWithGemini } from './services/geminiService';
import { VerificationResult as ResultType } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (text: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await verifyNewsWithGemini(text);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Algo deu errado. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] selection:bg-blue-500/30">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        <Header />
        
        <NewsInput onVerify={handleVerify} isLoading={loading} />

        {error && (
          <div className="w-full max-w-3xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 animate-fade-in text-red-400">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {result && (
          <VerificationResult result={result} />
        )}

        {/* Footer */}
        <div className="mt-20 text-center border-t border-slate-800 pt-8">
            <p className="text-slate-600 text-sm">
                Desenvolvido com Google Gemini 2.5 Flash & Search Grounding. 
                <br className="md:hidden"/> A IA pode cometer erros. Por favor, verifique informações importantes.
            </p>
        </div>
      </div>
    </div>
  );
};

export default App;