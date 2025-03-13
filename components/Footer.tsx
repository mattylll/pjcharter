import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">PJ Charter</h3>
            <p className="text-secondary-300 mb-4">
              Premium private jet charter services for business and leisure travel worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </a>
              <a href="#" className="text-secondary-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
              <a href="#" className="text-secondary-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-secondary-300 hover:text-white">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/aircraft" className="text-secondary-300 hover:text-white">
                  Aircraft Fleet
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-secondary-300 hover:text-white">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-secondary-300 hover:text-white">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/business-travel" className="text-secondary-300 hover:text-white">
                  Business Travel
                </Link>
              </li>
              <li>
                <Link href="/services/leisure-travel" className="text-secondary-300 hover:text-white">
                  Leisure Travel
                </Link>
              </li>
              <li>
                <Link href="/services/group-charters" className="text-secondary-300 hover:text-white">
                  Group Charters
                </Link>
              </li>
              <li>
                <Link href="/services/medical-transport" className="text-secondary-300 hover:text-white">
                  Medical Transport
                </Link>
              </li>
              <li>
                <Link href="/services/event-transport" className="text-secondary-300 hover:text-white">
                  Event Transport
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2 mt-0.5 text-primary-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-secondary-300">
                  123 Aviation Way, London, UK
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2 mt-0.5 text-primary-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-secondary-300">
                  +44 (0) 123 456 7890
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2 mt-0.5 text-primary-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-secondary-300">
                  info@pjcharter.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-8 pt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-secondary-400">
            &copy; {currentYear} PJ Charter. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-secondary-400 hover:text-white mx-2">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-secondary-400 hover:text-white mx-2">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-secondary-400 hover:text-white mx-2">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
