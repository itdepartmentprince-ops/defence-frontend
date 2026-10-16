export async function POST(request) {
  const body = await request.text().catch(() => "");
  return Response.json({ ok: true, received: !!body });
}
