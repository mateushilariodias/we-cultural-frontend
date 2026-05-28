import { NextRequest, NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/config/api';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch(API_ENDPOINTS.artists, {
      method: 'POST',
      body: formData,
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
        { message: data.message || 'Erro ao cadastrar artista' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    return NextResponse.json(
      { message: 'Erro ao conectar com o servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Método não permitido. Use POST para cadastrar.' },
    { status: 405 }
  );
}
