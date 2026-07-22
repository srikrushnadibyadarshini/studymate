function FeatureCard({ icon, title, description, href }) {
  return (
    
      <a href={href}
      className="group relative bg-white/70 backdrop-blur-sm border border-mist rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-ink/60">{description}</p>
    </a>
  )
}

export default FeatureCard