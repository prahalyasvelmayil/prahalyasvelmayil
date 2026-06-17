import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "public", "users.json");

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeUsers(users: unknown[]) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

export async function GET() {
  return NextResponse.json(readUsers());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, email, passwordHash, name } = body;
  const users = readUsers();

  if (action === "register") {
    if (users.find((u: { email: string }) => u.email === email)) {
      return NextResponse.json({ error: "Email already registered." }, { status: 400 });
    }
    const newUser = { email, name: name || "", passwordHash, createdAt: new Date().toISOString() };
    users.push(newUser);
    writeUsers(users);
    return NextResponse.json({ success: true, user: { email: newUser.email, name: newUser.name, createdAt: newUser.createdAt } });
  }

  if (action === "login") {
    const found = users.find((u: { email: string; passwordHash: string }) => u.email === email && u.passwordHash === passwordHash);
    if (!found) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    return NextResponse.json({ success: true, user: { email: found.email, name: found.name, createdAt: found.createdAt } });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
