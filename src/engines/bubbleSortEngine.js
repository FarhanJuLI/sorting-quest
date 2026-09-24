export function getBubbleSortSteps(inputArray) {
  const array = [...inputArray]
  const steps = []

  let stepId = 1

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      steps.push({
        id: stepId++,
        type: 'compare',
        indices: [j, j + 1],
        array: [...array],
        description: `Bandingkan ${array[j]} dan ${array[j + 1]}`,
      })

      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]

        steps.push({
          id: stepId++,
          type: 'swap',
          indices: [j, j + 1],
          array: [...array],
          description: `Tukar ${array[j + 1]} dan ${array[j]}`,
        })
      }
    }
  }

  return steps
}