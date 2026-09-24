export function classifyError({
  actionType,
  selectedAnswer,
  correctAnswer,
}) {
  if (actionType === 'compare' && selectedAnswer !== correctAnswer) {
    return 'Comparison Error'
  }

  if (actionType === 'swap' && selectedAnswer !== correctAnswer) {
    return 'Swap Error'
  }

  return 'Unknown Error'
}