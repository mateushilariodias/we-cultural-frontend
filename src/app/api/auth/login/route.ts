// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('📧 Login request:', { email });

    // Validação
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // URL do seu backend - AJUSTE AQUI A ROTA CORRETA!
    const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    // TESTE DIFERENTES ROTAS ATÉ ENCONTRAR A CORRETA:
    // Opção 1: /api/artists/login
    // Opção 2: /api/auth/login
    // Opção 3: /artists/login
    // Opção 4: /auth/login
    
    const backendEndpoint = `${BACKEND_URL}/api/auth/login`; // 🔧 AJUSTE ESTA ROTA
    
    console.log('🌐 Calling backend:', backendEndpoint);
    
    // Fazer requisição para o backend real
    const response = await fetch(backendEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('📥 Backend status:', response.status);
    console.log('📋 Content-Type:', response.headers.get('content-type'));

    // Verificar se a resposta é JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Backend retornou HTML:', text.substring(0, 200));
      
      return NextResponse.json(
        { 
          message: 'Erro de comunicação com o servidor. A rota do backend pode estar incorreta.',
          details: `Backend retornou: ${text.substring(0, 100)}...`
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('✅ Backend response:', data);

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Credenciais inválidas' },
        { status: response.status }
      );
    }

    // Verificar se tem os dados necessários
    if (!data.token) {
      return NextResponse.json(
        { message: 'Resposta do backend sem token' },
        { status: 500 }
      );
    }

    // Retornar no formato correto
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
    console.error('💥 Erro no login:', error);
    return NextResponse.json(
      { 
        message: 'Erro ao conectar com o servidor',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// Bloquear outros métodos
export async function GET() {
  return NextResponse.json(
    { message: 'Método não permitido. Use POST.' },
    { status: 405 }
  );
}

// ## 🔍 **DESCOBRIR A ROTA CORRETA DO SEU BACKEND:**

// ### **Opção 1: Testar no Postman/Insomnia/Thunder Client**

// Teste estas rotas uma por uma no Postman:
// ```
// POST http://localhost:3001/api/auth/login
// POST http://localhost:3001/api/artists/login
// POST http://localhost:3001/auth/login
// POST http://localhost:3001/artists/login
// POST http://localhost:3001/login