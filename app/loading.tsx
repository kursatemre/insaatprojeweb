export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-muted-gold rounded-lg animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-playfair font-bold text-white">EP</span>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="font-playfair font-bold text-2xl text-white mb-4">Yükleniyor</h2>

        {/* Loading Spinner */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-muted-gold rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-muted-gold rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-muted-gold rounded-full animate-bounce"></div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-muted-gold to-bronze animate-[shimmer_2s_ease-in-out_infinite] w-1/2"></div>
        </div>
      </div>

      {/* Blueprint Pattern Background */}
      <div className="absolute inset-0 bg-blueprint-pattern opacity-5 pointer-events-none"></div>
    </div>
  );
}
