import type { Metadata } from 'next'
import Hello from '@/components/hello'

// Config-based Metadata example for homepage
export const metadata: Metadata = {
  title: 'Home - Next.js Demo',
  description: 'Welcome to our Next.js demo application showcasing modern web development features.',
  openGraph: {
    title: 'Home - Next.js Demo',
    description: 'Welcome to our Next.js demo application showcasing modern web development features.',
    type: 'website',
  },
}

const Home = () => {
  console.log('What type of a component am I?');

  return (
    <main>
      <div className="text-5xl font-bold underline">Welcome to Next.js</div>
      <Hello />
    </main>
  )
}

export default Home