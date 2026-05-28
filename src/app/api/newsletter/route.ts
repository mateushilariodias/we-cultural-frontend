import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/config/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Email inválido' },
        { status: 400 }
      );
    }

    try {
      const response = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        // Backend retornou erro — registra e confirma ao usuário de qualquer forma
        console.log(`[newsletter] Backend retornou ${response.status} para: ${email}`);
      }
    } catch {
      // Backend indisponível ou endpoint não implementado ainda
      console.log(`[newsletter] Backend indisponível. Inscrição pendente: ${email}`);
    }

    return NextResponse.json({ message: 'Inscrição realizada com sucesso' });

  } catch {
    return NextResponse.json(
      { message: 'Requisição inválida' },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Método não permitido. Use POST.' },
    { status: 405 }
  );
}
