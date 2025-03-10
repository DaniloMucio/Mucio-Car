'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type RatingModalProps = {
  isOpen: boolean
  onClose: () => void
  clientName: string
  serviceName: string
}

export default function RatingModal({ isOpen, onClose, clientName, serviceName }: RatingModalProps) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Resetar estado quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      setRating(0)
      setHoverRating(0)
      setComment('')
      setError('')
      setSuccess(false)
      setIsSubmitting(false)
    }
  }, [isOpen])

  // Fechar modal após sucesso
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [success, onClose])

  // Lidar com clique na estrela
  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating)
  }

  // Lidar com hover na estrela
  const handleStarHover = (hoveredRating: number) => {
    setHoverRating(hoveredRating)
  }

  // Lidar com envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      // Validar dados
      if (rating === 0) {
        throw new Error('Por favor, selecione uma avaliação de 1 a 5 estrelas.')
      }
      
      if (!comment.trim()) {
        throw new Error('Por favor, deixe um comentário sobre sua experiência.')
      }
      
      // Criar objeto de depoimento
      const testimonial = {
        id: Date.now(),
        nome: clientName,
        texto: comment,
        avaliacao: rating,
        data: new Date().toISOString()
      }
      
      // Salvar no localStorage
      const existingTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]')
      const updatedTestimonials = [...existingTestimonials, testimonial]
      localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials))
      
      // Mostrar mensagem de sucesso
      setSuccess(true)
      
      // Limpar formulário
      setRating(0)
      setComment('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao enviar sua avaliação.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Avalie sua experiência</h2>
        
        {success ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            Obrigado por sua avaliação! Seu feedback é muito importante para nós.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="mb-4 text-gray-700">
              Olá <span className="font-medium">{clientName}</span>, como foi sua experiência com o serviço de <span className="font-medium">{serviceName}</span>?
            </p>
            
            {/* Estrelas para avaliação */}
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={() => handleStarHover(0)}
                  className="text-3xl px-1 focus:outline-none"
                >
                  <span className={`${
                    (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
            
            {/* Comentário */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                Seu comentário
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondary"
                rows={4}
                placeholder="Conte-nos mais sobre sua experiência..."
              ></textarea>
            </div>
            
            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                {error}
              </div>
            )}
            
            {/* Botões */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 