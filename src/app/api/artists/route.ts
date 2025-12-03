import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Recebendo cadastro de artista...');

    // Pegar FormData (inclui arquivo)
    const formData = await request.formData();

    // URL do backend
    const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const backendEndpoint = `${BACKEND_URL}/api/artists`;

    console.log('🌐 Enviando para backend:', backendEndpoint);

    // Fazer requisição para o backend com FormData
    const response = await fetch(backendEndpoint, {
      method: 'POST',
      body: formData, // Enviar FormData diretamente (não transformar em JSON!)
    });

    console.log('📥 Status do backend:', response.status);

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Backend retornou HTML:', text.substring(0, 200));
      
      return NextResponse.json(
        { message: 'Erro de comunicação com o servidor' },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('✅ Resposta do backend:', data);

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Erro ao cadastrar artista' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error('💥 Erro no cadastro:', error);
    return NextResponse.json(
      { message: 'Erro ao conectar com o servidor' },
      { status: 500 }
    );
  }
}

// Bloquear outros métodos
export async function GET() {
  return NextResponse.json(
    { message: 'Método não permitido. Use POST para cadastrar.' },
    { status: 405 }
  );
}