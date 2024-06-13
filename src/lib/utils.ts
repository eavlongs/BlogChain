import crypto from "crypto";

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day}, ${month} ${year}`;
}

export function calculateHash(object: any): string {
    return crypto
        .createHash("sha256")
        .update(JSON.stringify(object))
        .digest("hex");
}
