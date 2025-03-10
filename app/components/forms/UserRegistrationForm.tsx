'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Esquema de validação
const schema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  sobrenome: yup.string().required('Sobrenome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  confirmarSenha: yup.string()
    .oneOf([yup.ref('senha')], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
}).required()

type FormData = yup.InferType<typeof schema>

export default function UserRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError('')
    
    try {
      // Aqui seria a chamada para a API para registrar o usuário
      // Por enquanto, vamos simular um registro bem-sucedido
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Dados do usuário:', data)
      setIsSuccess(true)
      reset()
    } catch (err) {
      setError('Ocorreu um erro ao registrar. Por favor, tente novamente.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-serif font-bold mb-6 text-primary">Cadastre-se</h2>
      
      {isSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
          Cadastro realizado com sucesso! Agora você pode agendar seu horário.
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nome" className="block mb-1 font-medium text-gray-700">Nome</label>
            <input 
              type="text" 
              id="nome" 
              {...register('nome')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
              placeholder="Seu nome"
            />
            {errors.nome && <p className="mt-1 text-red-600 text-sm">{errors.nome.message}</p>}
          </div>
          
          <div>
            <label htmlFor="sobrenome" className="block mb-1 font-medium text-gray-700">Sobrenome</label>
            <input 
              type="text" 
              id="sobrenome" 
              {...register('sobrenome')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
              placeholder="Seu sobrenome"
            />
            {errors.sobrenome && <p className="mt-1 text-red-600 text-sm">{errors.sobrenome.message}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
            placeholder="Seu email"
          />
          {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        
        <div>
          <label htmlFor="telefone" className="block mb-1 font-medium text-gray-700">Telefone</label>
          <input 
            type="tel" 
            id="telefone" 
            {...register('telefone')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
            placeholder="(00) 00000-0000"
          />
          {errors.telefone && <p className="mt-1 text-red-600 text-sm">{errors.telefone.message}</p>}
        </div>
        
        <div>
          <label htmlFor="senha" className="block mb-1 font-medium text-gray-700">Senha</label>
          <input 
            type="password" 
            id="senha" 
            {...register('senha')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
            placeholder="Sua senha"
          />
          {errors.senha && <p className="mt-1 text-red-600 text-sm">{errors.senha.message}</p>}
        </div>
        
        <div>
          <label htmlFor="confirmarSenha" className="block mb-1 font-medium text-gray-700">Confirmar Senha</label>
          <input 
            type="password" 
            id="confirmarSenha" 
            {...register('confirmarSenha')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
            placeholder="Confirme sua senha"
          />
          {errors.confirmarSenha && <p className="mt-1 text-red-600 text-sm">{errors.confirmarSenha.message}</p>}
        </div>
        
        <button 
          type="submit" 
          className="btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  )
} 