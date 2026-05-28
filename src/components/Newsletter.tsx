'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-16 px-4 lg:px-40 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white border-2 border-bluePrimary rounded-lg p-12">
          <div className="flex items-start gap-4 mb-6">
            <Mail className="w-6 h-6 text-bluePrimary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-bluePrimary mb-2">
                Receba Notícias
              </h3>
              <p className="text-gray-600">
                Fique atualizado sobre novos artistas, oportunidades e eventos da comunidade Nós Cultural.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-bluePrimary transition"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-greenPrimary text-white font-semibold rounded hover:opacity-90 transition disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : 'Inscrever'}
            </button>
          </form>

          {status === 'success' && (
            <p className="text-green-600 font-semibold mt-4">✓ Obrigado! Verifique seu email.</p>
          )}
          {status === 'error' && email === '' && (
            <p className="text-red-600 font-semibold mt-4">✗ Por favor, insira um email válido.</p>
          )}

          <p className="text-xs text-gray-500 mt-4">
            Respeitamos sua privacidade. Você pode desinscrever-se a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
}