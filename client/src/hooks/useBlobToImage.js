function useBlobToImage(image) {
    if (!image) {
        return null
    }

    const bytea = new Uint8Array(image);

    const blob = new Blob([bytea], { type: 'image/jpeg' });

    return URL.createObjectURL(blob);
}

export default useBlobToImage;
