// Blob을 File 객체로 변환
export function blobToFile(blob: Blob, fileName: string): File {
	const file = new File([blob], fileName, { type: blob.type });
	return file;
}
