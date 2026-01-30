import type { Metadata } from 'next'

// Config-based Metadata example
export const metadata: Metadata = {
  title: 'About Us - Next.js Demo',
  description: 'Learn more about our Next.js demo application and its features.',
  openGraph: {
    title: 'About Us - Next.js Demo',
    description: 'Learn more about our Next.js demo application and its features.',
    type: 'website',
  },
}

const About = () => {
  throw new Error('This is a test error')

  return (
    <div>
        <h1>About</h1>
    </div>
  )
}

export default About