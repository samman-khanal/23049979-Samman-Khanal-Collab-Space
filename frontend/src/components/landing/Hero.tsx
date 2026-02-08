import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Where Teams <span className="text-indigo-600">Collaborate</span>{" "}
              and Communicate
            </h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              CollabSpace brings together real-time communication and project
              management in one powerful platform. Chat, plan, and execute — all
              in one place.
            </p>

            {/* Feature List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-slate-700">
                  Real-time team collaboration
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-slate-700">
                  Intuitive task and project boards
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-slate-700">
                  Seamless file sharing and storage
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-slate-700">
                  Enterprise-grade security
                </span>
              </div>
            </div>

            <Link
              to="/register"
              className="px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
            >
              Get Started Free
            </Link>
          </div>

          {/* Right Image - Product Mockup */}
          <div className="relative">
            {/* Product Screenshot/Mockup */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Browser-like Interface */}
              <div className="bg-linear-to-br from-blue-600 to-blue-800 p-6">
                {/* Header */}
                <div className="bg-blue-700 rounded-t-xl px-4 py-3 flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                </div>

                {/* Main Interface */}
                <div className="bg-white rounded-lg p-4">
                  {/* Mini kanban board */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="space-y-2">
                      <div className="h-2 w-16 bg-slate-300 rounded"></div>
                      <div className="h-16 bg-blue-400 rounded-lg"></div>
                      <div className="h-12 bg-blue-300 rounded-lg"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-16 bg-slate-300 rounded"></div>
                      <div className="h-14 bg-yellow-400 rounded-lg"></div>
                      <div className="h-10 bg-yellow-300 rounded-lg"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-16 bg-slate-300 rounded"></div>
                      <div className="h-12 bg-green-400 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Mini chart */}
                  <div className="h-12 bg-linear-to-t from-indigo-200 to-indigo-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
