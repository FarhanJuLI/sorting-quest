export function getRemedialMission(dominantError) {
  if (dominantError === 'Comparison Error') {
    return {
      title: 'Latihan Perbandingan',
      description:
        'Fokus latihan: tentukan apakah dua angka yang dibandingkan perlu ditukar.',
    }
  }

  if (dominantError === 'Swap Error') {
    return {
      title: 'Latihan Swap',
      description:
        'Fokus latihan: tentukan posisi elemen yang benar setelah proses pertukaran.',
    }
  }

  if (dominantError === 'Boundary Error') {
    return {
      title: 'Latihan Batas Iterasi',
      description:
        'Fokus latihan: pahami batas perulangan dan elemen mana yang masih perlu diperiksa.',
    }
  }

  return {
    title: 'Tidak Ada Remedial',
    description:
      'Belum ada kesalahan dominan. Pertahankan hasil belajarmu.',
  }
}