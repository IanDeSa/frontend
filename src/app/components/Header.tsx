import Link from 'next/link';
import React from 'react'

function Header() {
  return (
    <header className="bg-sky-800 text-white top-0 left-77 w-full flex justify-center">
      <Link href="/">
          <button
          className="mt-4 text-white font-bold hover:bg-sky-700 py-2 px-4 rounded"
          >
          Home
          </button>
      </Link>
      <Link href="/form-create">
          <button
          className="mt-4 text-white font-bold hover:bg-sky-700 py-2 px-4 rounded"
          >
          Criar
          </button>
      </Link>
    </header>
  )
}

export default Header;