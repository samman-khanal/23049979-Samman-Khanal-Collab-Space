import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Loved by Teams Worldwide
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Sarah Chen"
            role="Product Manager"
            company="TechFlow Inc."
            quote="CollabSpace completely transformed how our remote team collaborates. The integration of chat and project boards is seamless and intuitive."
            avatar="SC"
            avatarBg="bg-indigo-600"
          />
          <TestimonialCard
            name="Marcus Rodriguez"
            role="Engineering Lead"
            company="DevStudio"
            quote="Finally, a platform that combines communication and task management without feeling bloated. Our team's productivity has increased by 40%."
            avatar="MR"
            avatarBg="bg-purple-600"
          />
          <TestimonialCard
            name="Emily Watson"
            role="Startup Founder"
            company="GrowthLabs"
            quote="The onboarding was incredibly smooth, and within hours our entire team was up and running. Best collaboration tool we've ever used!"
            avatar="EW"
            avatarBg="bg-green-600"
          />
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  avatarBg: string;
}

function TestimonialCard({
  name,
  role,
  company,
  quote,
  avatar,
  avatarBg,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-100">
      {/* Avatar and Info */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 ${avatarBg} rounded-full flex items-center justify-center text-white font-semibold`}
        >
          {avatar}
        </div>
        <div>
          <div className="font-semibold text-slate-900">{name}</div>
          <div className="text-sm text-slate-600">{role}</div>
        </div>
      </div>

      {/* Company */}
      <div className="text-sm text-slate-500 mb-4">{company}</div>

      {/* Quote */}
      <p className="text-slate-700 leading-relaxed">{quote}</p>

      {/* Stars */}
      <div className="flex gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    </div>
  );
}
