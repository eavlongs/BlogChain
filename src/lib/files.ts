export function filenameToURL(
    file: string | null | undefined,
    fallbackSrc?: string | undefined
): string {
    if (!file) {
        return fallbackSrc || "https://placehold.co/600x400?text=Image";
    }

    const fileStartsWith = ["http", "/", "blob:"];
    if (fileStartsWith.some((fsw) => file.startsWith(fsw))) {
        return file;
    }

    return `/api/file?filename=${file}`;
}
