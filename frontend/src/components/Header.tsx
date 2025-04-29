import { LuMenu } from 'react-icons/lu'

export const Header = () => {
  return (
    <header className="bg-primary-dark text-white p-4 flex justify-between items-center">
      <h1 className="font-black text-2xl">Question Editor</h1>

      <LuMenu className='md:hidden text-3xl' />
      <ul className="hidden md:flex space-x-4">
        <li><a href="/">Home</a></li>
        <li><a href="/question">Question</a></li>
      </ul>
    </header>
  )
}