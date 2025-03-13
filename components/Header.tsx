'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold text-primary-700">PJ Charter</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-secondary-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link href="/aircraft" className="text-secondary-700 hover:text-primary-600 font-medium">
              Aircraft
            </Link>
            <Link href="/destinations" className="text-secondary-700 hover:text-primary-600 font-medium">
              Destinations
            </Link>
            <Link href="/services" className="text-secondary-700 hover:text-primary-600 font-medium">
              Services
            </Link>
            <Link href="/blog" className="text-secondary-700 hover:text-primary-600 font-medium">
              Blog
            </Link>
            <Link href="/contact" className="text-secondary-700 hover:text-primary-600 font-medium">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/booking" className="btn-primary">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-secondary-700 hover:text-primary-600"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {!isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-secondary-700 hover:text-primary-600 font-medium">
                Home
              </Link>
              <Link href="/aircraft" className="text-secondary-700 hover:text-primary-600 font-medium">
                Aircraft
              </Link>
              <Link href="/destinations" className="text-secondary-700 hover:text-primary-600 font-medium">
                Destinations
              </Link>
              <Link href="/services" className="text-secondary-700 hover:text-primary-600 font-medium">
                Services
              </Link>
              <Link href="/blog" className="text-secondary-700 hover:text-primary-600 font-medium">
                Blog
              </Link>
              <Link href="/contact" className="text-secondary-700 hover:text-primary-600 font-medium">
                Contact
              </Link>
              <Link href="/booking" className="btn-primary inline-block text-center">
                Book Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
