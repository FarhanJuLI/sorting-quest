export function analyzeErrors(errors) {
  const summary = {
    totalErrors: errors.length,
    comparisonErrors: 0,
    swapErrors: 0,
    boundaryErrors: 0,
    dominantError: null,
  }

  errors.forEach((error) => {
    if (error.type === 'Comparison Error') {
      summary.comparisonErrors += 1
    }

    if (error.type === 'Swap Error') {
      summary.swapErrors += 1
    }

    if (error.type === 'Boundary Error') {
      summary.boundaryErrors += 1
    }
  })

  const errorCounts = [
    {
      type: 'Comparison Error',
      count: summary.comparisonErrors,
    },
    {
      type: 'Swap Error',
      count: summary.swapErrors,
    },
    {
      type: 'Boundary Error',
      count: summary.boundaryErrors,
    },
  ]

  const dominant = errorCounts.reduce((highest, current) => {
    return current.count > highest.count ? current : highest
  })

  if (dominant.count > 0) {
    summary.dominantError = dominant.type
  }

  return summary
}