import { put } from "@vercel/blob";

export async function uploadAuditAttachment(
  file: File,
  auditId: string,
): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return null;
  }

  const pathname = `audits/${auditId}/${file.name}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return blob.url;
}
