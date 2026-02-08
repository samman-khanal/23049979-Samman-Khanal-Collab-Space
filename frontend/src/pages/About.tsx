import React from "react";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";
import {
  Users,
  Target,
  Lightbulb,
  Heart,
  Rocket,
  Shield,
  Globe,
  Zap,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Built for Teams Who{" "}
              <span className="text-indigo-600">Dream Big</span>
            </h1>
            <p className="text-base text-slate-600 leading-relaxed text-justify">
              We're on a mission to transform how teams collaborate. CollabSpace
              brings together the power of real-time communication and intuitive
              project management to help your team achieve extraordinary
              results.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard number="50K+" label="Active Teams" />
            <StatCard number="2M+" label="Tasks Completed" />
            <StatCard number="150+" label="Countries" />
            <StatCard number="99.9%" label="Uptime" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Mission */}
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-6">
                <Target className="w-4 h-4" />
                <span className="text-sm font-semibold">Our Mission</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Empowering Teams to Work Smarter
              </h2>
              <p className="text-base text-slate-600 mb-4 text-justify">
                At CollabSpace, we believe that great things happen when teams
                work together without barriers. Our mission is to break down
                silos and create a unified workspace where communication flows
                naturally and productivity thrives.
              </p>
              <p className="text-base text-slate-600 text-justify">
                We're committed to building tools that are intuitive, powerful,
                and accessible to teams of all sizes—from startups to enterprise
                organizations.
              </p>
            </div>

            {/* Right - Visual Element */}
            <div className="relative">
              <div className="bg-linear-to-br from-indigo-800 to-purple-800 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-slate-200 rounded w-2/3 mb-2"></div>
                      <div className="h-2 bg-slate-100 rounded w-1/3"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-slate-200 rounded w-4/5 mb-2"></div>
                      <div className="h-2 bg-slate-100 rounded w-2/5"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Users className="w-8 h-8 text-blue-600" />}
              iconBg="bg-blue-100"
              title="Collaboration First"
              description="We believe in the power of teamwork and building features that bring people together."
            />
            <ValueCard
              icon={<Lightbulb className="w-8 h-8 text-purple-600" />}
              iconBg="bg-purple-100"
              title="Innovation"
              description="We constantly push boundaries to deliver cutting-edge solutions for modern teams."
            />
            <ValueCard
              icon={<Heart className="w-8 h-8 text-green-600" />}
              iconBg="bg-green-100"
              title="Customer Focus"
              description="Your success is our success. We listen, learn, and adapt to serve you better."
            />
            <ValueCard
              icon={<Shield className="w-8 h-8 text-orange-600" />}
              iconBg="bg-orange-100"
              title="Trust & Security"
              description="We protect your data with enterprise-grade security and transparent practices."
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image/Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-linear-to-br from-blue-700 to-indigo-700 rounded-2xl p-1">
                <div className="bg-white rounded-xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-900 mb-2">
                          2023 - The Beginning
                        </div>
                        <div className="h-2 bg-slate-300 rounded w-full mb-1"></div>
                        <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-900 mb-2">
                          2024 - Growth
                        </div>
                        <div className="h-2 bg-slate-300 rounded w-full mb-1"></div>
                        <div className="h-2 bg-slate-300 rounded w-4/5"></div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-900 mb-2">
                          2025 - Expansion
                        </div>
                        <div className="h-2 bg-slate-300 rounded w-full mb-1"></div>
                        <div className="h-2 bg-slate-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-semibold">Our Journey</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                From Frustration to Innovation
              </h2>
              <div className="space-y-4 text-base text-slate-600">
                <p className="text-justify">
                  CollabSpace was born from a simple frustration: switching
                  between too many tools to get work done. Our founders
                  experienced firsthand the inefficiency of juggling multiple
                  platforms for chat, tasks, and project management.
                </p>
                <p className="text-justify">
                  In 2023, we set out to create a solution that would unify team
                  collaboration under one roof. We combined the best aspects of
                  communication tools like Slack with the organizational power
                  of project management platforms like Trello.
                </p>
                <p className="text-justify">
                  Today, thousands of teams worldwide trust CollabSpace to keep
                  their work organized, their conversations flowing, and their
                  projects on track. We're just getting started.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-linear-to-br from-indigo-800 to-purple-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Teams Choose CollabSpace
            </h2>
            <p className="text-base text-indigo-100 max-w-2xl mx-auto">
              We're more than just a tool—we're your partner in productivity
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <WhyCard
              icon={<Zap className="w-6 h-6 text-yellow-100" />}
              title="Lightning Fast"
              description="Built for speed with real-time updates that keep your team in sync."
            />
            <WhyCard
              icon={<Shield className="w-6 h-6 text-green-100" />}
              title="Enterprise Security"
              description="Bank-level encryption and compliance with global security standards."
            />
            <WhyCard
              icon={<Heart className="w-6 h-6 text-red-100" />}
              title="24/7 Support"
              description="Our dedicated team is always here to help you succeed."
            />
            <WhyCard
              icon={<Globe className="w-6 h-6 text-blue-100" />}
              title="Global Reach"
              description="Teams in 150+ countries collaborate seamlessly on CollabSpace."
            />
            <WhyCard
              icon={<Rocket className="w-6 h-6 text-purple-100" />}
              title="Always Improving"
              description="Regular updates with new features based on your feedback."
            />
            <WhyCard
              icon={<Users className="w-6 h-6 text-indigo-100" />}
              title="Scales With You"
              description="From 5 to 5,000 team members, CollabSpace grows with your business."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
      <div className="text-4xl font-bold text-indigo-600 mb-2">{number}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}

function ValueCard({ icon, iconBg, title, description }: ValueCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
      <div
        className={`w-16 h-16 ${iconBg} rounded-xl flex items-center justify-center mx-auto mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

interface WhyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function WhyCard({ icon, title, description }: WhyCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-indigo-100 leading-relaxed">{description}</p>
    </div>
  );
}
