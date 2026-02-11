import * as htmlToImage from 'html-to-image'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export const shareImage = async (ref, title) => {
  const dataUrl = await htmlToImage.toPng(ref.current)

  const blob = await (await fetch(dataUrl)).blob()
  const file = new File([blob], `${title}.png`, { type: 'image/png' })

  if (navigator.share) {
    await navigator.share({
      title: title,
      files: [file],
    })
  } else {
    alert('Share not supported on this browser')
  }
}

export const sharePDF = async (ref, title) => {
  const element = ref.current

  const canvas = await html2canvas(element, {
    scale: 3, // better quality
    onclone: (doc) => {
      doc.querySelectorAll('*').forEach((el) => {
        el.style.color = '#000'
        el.style.backgroundColor = '#fff'
      })
    },
  })

  const pdf = new jsPDF('p', 'mm', 'a3')

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const margin = 10 // ✅ margin mm
  const imgWidth = pageWidth - margin * 2
  const pxPerMm = canvas.width / imgWidth

  const pageHeightPx = (pageHeight - margin * 2) * pxPerMm

  let y = 0

  while (y < canvas.height) {
    const pageCanvas = document.createElement('canvas')
    pageCanvas.width = canvas.width
    pageCanvas.height = Math.min(pageHeightPx, canvas.height - y)

    const ctx = pageCanvas.getContext('2d')

    ctx.drawImage(
      canvas,
      0,
      y,
      canvas.width,
      pageCanvas.height,
      0,
      0,
      canvas.width,
      pageCanvas.height
    )

    const imgData = pageCanvas.toDataURL('image/png')

    if (y > 0) pdf.addPage()

    const imgHeight = pageCanvas.height / pxPerMm

    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight)

    y += pageHeightPx
  }
  pdf.save(`${title}.pdf`)

  const blob = pdf.output('blob')
  const file = new File([blob], `${title}.pdf`, {
    type: 'application/pdf',
  })

  if (navigator.share) {
    await navigator.share({
      files: [file],
      title: title,
    })
  }
}
