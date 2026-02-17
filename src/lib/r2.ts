import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

function getR2Client(): S3Client {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const endpoint = process.env.R2_ENDPOINT;

  if (!accessKeyId || !secretAccessKey || !endpoint) {
    throw new Error("R2 is not configured.");
  }

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function createResumeUploadUrl(params: {
  key: string;
  contentType: string;
}): Promise<string> {
  const bucket = process.env.R2_BUCKET;
  if (!bucket) {
    throw new Error("R2_BUCKET is not configured.");
  }

  const client = getR2Client();
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: params.key,
    ContentType: params.contentType,
  });

  return getSignedUrl(client, command, { expiresIn: 900 });
}

export async function resumeExists(key: string): Promise<boolean> {
  const bucket = process.env.R2_BUCKET;
  if (!bucket) {
    throw new Error("R2_BUCKET is not configured.");
  }

  const client = getR2Client();

  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
    return true;
  } catch {
    return false;
  }
}

export function getResumePublicUrl(key: string): string {
  const base = process.env.R2_PUBLIC_BASE_URL;
  const bucket = process.env.R2_BUCKET;

  if (base) {
    return `${base.replace(/\/$/, "")}/${key}`;
  }

  return `r2://${bucket}/${key}`;
}
