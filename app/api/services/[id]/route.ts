import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id }
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Serviço não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Erro ao buscar serviço:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar serviço' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        price: data.price
      }
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar serviço' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.service.delete({
      where: { id: params.id }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Erro ao excluir serviço:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir serviço' },
      { status: 500 }
    );
  }
} 