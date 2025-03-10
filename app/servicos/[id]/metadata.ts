import { Metadata } from 'next'
import { getServiceById } from '../../data/services'

interface ServicePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceById(params.id)
  if (!service) return { title: 'Serviço não encontrado' }

  return {
    title: `${service.title} | Mucio Car`,
    description: service.description,
  }
} 