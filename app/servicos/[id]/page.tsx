import Image from 'next/image';
import Link from 'next/link';
import { getServiceById } from '../../data/services';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceById(params.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-8">
          <div className="text-center animate-slide-up">
            <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-gray-600">{service.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8 animate-slide-up">
            <div className="vintage-card py-3 px-6">
              <span className="text-gold-light font-bold">{service.price}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-8 animate-slide-up">
            <p>{service.details.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 animate-slide-up">
            <div>
              <h3 className="text-2xl font-bold mb-4">Benefícios</h3>
              <ul className="space-y-2">
                {service.details.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold-light mr-2">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Processo</h3>
              <ul className="space-y-2">
                {service.details.process.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold-light mr-2">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8 animate-slide-up">
            <h3 className="text-2xl font-bold mb-4">Recomendações</h3>
            <ul className="space-y-2">
              {service.details.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gold-light mr-2">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Link href="/agendamento" className="btn-primary">
              Agendar Serviço
            </Link>
            <Link href="/servicos" className="btn-secondary">
              Ver Outros Serviços
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 