function useBlobToImage(image) {
    if (!image?.data) {
        return null
    }

    const bytea = new Uint8Array(image.data);

    const blob = new Blob([bytea], { type: 'image/jpeg' });

    return URL.createObjectURL(blob);
}

export default useBlobToImage;
