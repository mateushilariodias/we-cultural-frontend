'use client';

import React from 'react';
import { Users, Target, Network, Search } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-20 px-4 lg:px-40 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-4xl font-bold text-bluePrimary mb-6">
            Sobre a Nós Cultural
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A plataforma que conecta artistas, coletivos e espaços culturais de Franca em um único lugar.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left - Text */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-bluePrimary mb-4">Missão</h3>
              <p className="text-gray-600 leading-relaxed">
                Nós Cultural existe para <strong>centralizar e dar visibilidade</strong> a toda a diversidade artística e cultural de Franca. 
                Queremos que artistas, coletivos e espaços culturais sejam encontrados com facilidade, 
                colaborem entre si e criem oportunidades de trabalho e crescimento.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-bluePrimary mb-4">Visão</h3>
              <p className="text-gray-600 leading-relaxed">
                Uma Franca onde a cultura é acessível, colaborativa e próspera. 
                Onde artistas têm oportunidades reais, coletivos funcionam de forma integrada, 
                e espaços culturais são encontrados facilmente.
              </p>
            </div>

             <div>
              <h3 className="text-2xl font-bold text-bluePrimary mb-4">Valores</h3>
              <p className="text-gray-600 leading-relaxed">
                Democratização da Cultura. Valorização do Artista Local. Colaboração acima da Competição. Transparência e Dados Abertos. Inclusão e Diversidade. Autonomia Criativa. Inovação com Propósito Social. Comunidade em Primeiro Lugar.
              </p>
            </div>

            {/* <div>
              <h3 className="text-2xl font-bold text-bluePrimary mb-4">100% Gratuito</h3>
              <p className="text-gray-600 leading-relaxed">
                Sem taxas de cadastro, sem intermediários, sem publicidade invasiva. 
                A plataforma é desenvolvida para servir a comunidade artística local.
              </p>
            </div> */}
          </div>

          {/* Right - Features Grid */}
          <div className="space-y-4">
            {[
              {
                icon: Users,
                title: 'Artistas',
                description: 'Cadastre seu perfil, mostre suas obras e conecte-se com outros profissionais.'
              },
              {
                icon: Target,
                title: 'Coletivos',
                description: 'Artistas podem formar coletivos para projetos e iniciativas em grupo.'
              },
              {
                icon: Network,
                title: 'Espaços Culturais',
                description: 'Estúdios, galerias, teatros e outros espaços ganham visibilidade.'
              },
              {
                icon: Search,
                title: 'Descoberta Fácil',
                description: 'Busque por categoria, veja estatísticas e encontre colaboradores.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-4 p-4 border-l-4 border-yellow-500 bg-gray-50 rounded">
                  <Icon className="w-6 h-6 text-bluePrimary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-bluePrimary mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-greenPrimary text-white rounded-xl p-12 mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center">Impacto na Comunidade</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '12+', label: 'Artistas Cadastrados' },
              { number: '12', label: 'Categorias Artísticas' },
              { number: '2+', label: 'Coletivos' },
              { number: '1', label: 'Espaços Culturais' }
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-yellow-300 mb-2">{stat.number}</p>
                <p className="text-white text-opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-bluePrimary text-center mb-12">Como Funciona</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Cadastro Artista',
                description: 'Artistas se registram com suas informações, foto, categorias e links do portfólio. Ganham um perfil público na plataforma.'
              },
              {
                number: '02',
                title: 'Formar Coletivos',
                description: 'Artistas podem criar ou participar de coletivos para trabalhos em grupo, compartilhando visibilidade e oportunidades.'
              },
              {
                number: '03',
                title: 'Registrar Espaços',
                description: 'Estúdios, galerias e teatros se registram (mesmo sem ser artistas) para ganhar visibilidade e conectar com profissionais.'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute top-0 left-0 w-14 h-14 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-bluePrimary font-bold text-xl">{step.number}</span>
                </div>
                <div className="pt-20 pl-0">
                  <h4 className="text-xl font-bold text-bluePrimary mb-3">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="mt-20 bg-blue-50 rounded-xl p-12">
          <h3 className="text-2xl font-bold text-bluePrimary mb-8 text-center">O Problema que Resolvemos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-lg font-bold text-red-600 mb-4">Antes:</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Artistas dispersos em redes sociais diferentes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Dificuldade em encontrar colaboradores</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Falta de dados sobre o cenário cultural local</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Espaços culturais desconectados dos artistas</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Pouca visibilidade para oportunidades</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-green-600 mb-4">Depois (Nós Cultural):</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Todos em um único lugar, fácil de buscar</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Colaborações e projetos facilitados</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Dashboard com dados reais da cultura de Franca</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Rede conectada de artistas e espaços</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Oportunidades centralizadas e acessíveis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}