import Modal from '@/components/Modal'
import './globals.css'
export const metadata= {
  title: 'Todo-app',
  description: 'Modern Todo-App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#F5F6F8]'>{children}<Modal /></body>
    </html>
  )
}
