import crypto from "crypto";

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day}, ${month} ${year}`;
}

export function calculateHash(object: any): string {
    if (Object.hasOwnProperty.call(object, "createdAt")) {
        // ensure that createdAt is in a consistent format because saving to the database and
        // reading from the database can result in different formats, just a slight difference can
        // cause the hash to be different lol
        object = {
            ...object,
            createdAt: new Date(object.createdAt).toLocaleDateString(),
        };
    }

    // sort object by keys so that hash is consistent because if the keys are in different order
    // the hash will be different lol
    object = Object.keys(object)
        .sort()
        .reduce((acc: any, key) => {
            acc[key] = object[key];
            return acc;
        }, {});

    return crypto
        .createHash("sha256")
        .update(JSON.stringify(object))
        .digest("hex");
}
