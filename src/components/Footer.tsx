'use client'

export default function Footer() {
  return (
    <footer className="relative z-10 py-20 px-4 border-t border-slate-900 bg-slate-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            NEON EXPERIENCE
          </h2>
          <p className="text-slate-400 max-w-sm">
            Pushing the boundaries of web experiences with 3D visuals and modern design systems.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Discord</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© 2026 NEON EXPERIENCE. All rights reserved.</p>
      </div>
    </footer>
  )
}
