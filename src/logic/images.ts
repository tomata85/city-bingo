import Resizer from 'react-image-file-resizer'

export function compressImage (
  image: Blob,
  onImageCompressed: (compressedImage: any) => void): void {
  Resizer.imageFileResizer(
    image,
    1000,
    1000,
    'JPEG',
    100,
    0,
    onImageCompressed,
    'blob'
  )
}
