import QRCode from 'qrcode'

export function generateQRCode({ canvasRef, url }) {
  const scanUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`
  QRCode.toCanvas(canvasRef.current, scanUrl, {
    width: 300, // this sets both width and height
    color: {
      dark: '#000000', // black squares
      light: '#ffffff', // white background
    },
  }).catch((err) => console.error(err))
}
