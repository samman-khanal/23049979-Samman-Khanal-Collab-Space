import { MessageSquare, Trello } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-800 to-purple-800 rounded-lg flex items-center justify-center">
              <div className="flex gap-0.5">
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <Trello className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <span className="text-lg font-semibold text-slate-900">
              CollabSpace
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>
            <HashLink
              smooth
              to="/#features"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </HashLink>

            <HashLink
              smooth
              to="/#pricing"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Pricing
            </HashLink>
            <Link
              to="/about"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
