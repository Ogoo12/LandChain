export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 mx-auto animate-pulse" />
        <p className="text-lg font-semibold">Loading LandChain...</p>
        <p className="text-sm text-gray-400">Initializing blockchain registry</p>
      </div>
    </div>
  )
}
