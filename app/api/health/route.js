export async function GET() {
  return Response.json({ ok: true, service: "defence-frontend", timestamp: new Date().toISOString() });
}
