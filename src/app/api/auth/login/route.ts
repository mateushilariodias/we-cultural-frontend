import { NextRequest, NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/config/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const response = await fetch(API_ENDPOINTS.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Backend retornou resposta não-JSON:', text.substring(0, 200));
      return NextResponse.json(
        { message: 'Erro de comunicação com o servidor' },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Credenciais inválidas' },
        { status: response.status }
      );
    }

    if (!data.token) {
      return NextResponse.json(
        { message: 'Resposta do backend sem token' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      token: data.token,
      artist: {
        id: data.artist?._id || data.artist?.id || data.id,
        name: data.artist?.name || data.name,
        email: data.artist?.email || data.email,
        profilePicture: data.artist?.profilePicture || data.profilePicture,
      },
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      {
        message: 'Erro ao conectar com o servidor',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Método não permitido. Use POST.' },
    { status: 405 }
  );
}
