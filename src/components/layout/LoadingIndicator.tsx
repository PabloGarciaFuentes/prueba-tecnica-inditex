import { useNavigation } from 'react-router-dom'
import { ThinkingOrb } from 'thinking-orbs'

export default function LoadingIndicator() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  if (!isLoading) return null

  return (
    <div className="flex items-center gap-2" aria-live="polite" aria-busy="true">
      <ThinkingOrb 
        theme="light"
        state="composing" 
        size={64} 
        speed={1.5}
        style={{
          filter: 'brightness(0) saturate(100%) invert(27%) sepia(85%) saturate(2462%) hue-rotate(213deg) brightness(97%) contrast(101%)'
        }}
      />
      <span className="t-shimmer" data-text="Loading…">Loading…</span>
    </div>
  )
}
