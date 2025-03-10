import Image from 'next/image';

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
  image: string;
  rating: number;
  className?: string;
}

export default function TestimonialCard({ name, role, testimonial, image, rating, className = '' }: TestimonialCardProps) {
  return (
    <div className={`vintage-card ${className}`}>
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-gold-DEFAULT mr-4">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-yellow-500">{name}</h3>
          <p className="text-light-dark text-sm">{role}</p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ${i < rating ? 'text-yellow-500' : 'text-gray-600'}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-light-dark italic mb-4">"{testimonial}"</p>
      <div className="flex justify-end">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 opacity-30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
    </div>
  );
} 