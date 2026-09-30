#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

type Mood = "happy" | "sleepy" | "excited" | "hungry" | "proud" | "chaotic";
type Pet = {
  name: string;
  species: string;
  xp: number;
  mood: Mood;
  commits: number;
  streak: number;
  lastSeen: string;
  createdAt: string;
  memories: string[];
};

const STATE = path.join(process.cwd(), ".repup.json");

const faces: Record<Mood, string> = {
  happy: " / \__\n(    @\___\n /         O",
  sleepy: " / \__\n(  -  - )\n /  ___/ ",
  excited: "/\\_/\\\n( >ω< )\n /  \  ",
  hungry: "/\\_/\\\n( ╥ω╥ )\n /  \  ",
  proud: "/\\_/\\\n( ᵔωᵔ )\n /  \  ",
  chaotic: "/\\_/\\\n( ⚡ω⚡ )\n /  \  "
};

const messages: Record<Mood, string[]> = {
  happy: ["we're building something.", "good repo. good life.", "keep shipping."],
  sleepy: ["no commits... i'm getting sleepy.", "is anyone still coding?", "zzz..."],
  excited: ["WE ARE SHIPPING.", "ANOTHER COMMIT?!", "I CAN FEEL THE MOMENTUM."],
  hungry: ["feed me a commit.", "i require code.", "one more commit. please."],
  proud: ["i saw that commit. nice work.", "that's actually clean.", "proud of you."],
  chaotic: ["THE REPO IS ALIVE.", "WHAT DID YOU JUST PUSH?", "I HAVE NO IDEA WHAT THIS CODE DOES."]
};

function sh(cmd: string): string {
  try { return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); }
  catch { return ""; }
}

function commits(): number {
  return Number(sh("git rev-list --count HEAD")) || 0;
}

function lastCommit(): string {
  return sh('git log -1 --pretty=format:"%s"') || "no commits yet";
}

function todayCommits(): number {
  return Number(sh('git rev-list --count --since="24 hours ago" HEAD')) || 0;
}

function repoName(): string {
  const remote = sh("git remote get-url origin");
  if (!remote) return path.basename(process.cwd());
  return remote.replace(/\.git$/, "").split("/").pop() || path.basename(process.cwd());
}

function load(): Pet {
  if (fs.existsSync(STATE)) {
    try { return JSON.parse(fs.readFileSync(STATE, "utf8")); } catch {}
  }
  return {
    name: "Repup",
    species: "repup",
    xp: 0,
    mood: "happy",
    commits: 0,
    streak: 0,
    lastSeen: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    memories: []
  };
}

function save(p: Pet) {
  fs.writeFileSync(STATE, JSON.stringify(p, null, 2));
}

function evolve(p: Pet, delta: number, today: number) {
  p.xp += delta * 12 + today * 3;
  p.streak = today > 0 ? p.streak + (delta > 0 ? 1 : 0) : 0;

  if (today >= 5) p.mood = "chaotic";
  else if (today >= 3) p.mood = "excited";
  else if (delta > 0) p.mood = "proud";
  else if (Date.now() - new Date(p.lastSeen).getTime() > 1000 * 60 * 60 * 24 * 3) p.mood = "hungry";
  else p.mood = "sleepy";

  const commit = lastCommit();
  if (delta > 0 && commit && !p.memories.includes(commit)) {
    p.memories.unshift(commit);
    p.memories = p.memories.slice(0, 5);
  }

  p.lastSeen = new Date().toISOString();
}

function level(xp: number) {
  return Math.floor(xp / 100) + 1;
}

function bar(value: number, max = 10) {
  const filled = Math.max(0, Math.min(max, Math.floor(value)));
  return "█".repeat(filled) + "░".repeat(max - filled);
}

function say(p: Pet) {
  const list = messages[p.mood];
  return list[p.xp % list.length];
}

function show(p: Pet) {
  const today = todayCommits();
  const lvl = level(p.xp);
  const energy = Math.min(10, Math.max(1, 10 - Math.floor(p.xp % 100 / 12)));

  console.clear();
  console.log(`
        ${faces[p.mood]}

       /|       |\\
      / |  GIT  | \\
     /  |       |  \\
        |_______|
        |  PET  |

   ${p.name.toUpperCase()} · ${repoName()}

   mood     ${p.mood}
   level    ${lvl}
   xp       ${p.xp}
   commits  ${p.commits}
   today    ${today}
   streak   ${p.streak}
   energy   [${bar(energy)}]

   "${say(p)}"

   last commit
   └─ ${lastCommit()}

   memories
   ${p.memories.length ? p.memories.map(x => "└─ " + x).join("\n   ") : "└─ nothing yet"}

`);
}

function init(p: Pet) {
  const name = process.argv[3];
  if (name) p.name = name;
  save(p);
  console.log(`🐾 Your Repup is ${p.name}.`);
}

function main() {
  const command = process.argv[2];
  const pet = load();

  if (command === "init") {
    init(pet);
    return;
  }

  const before = pet.commits;
  const now = commits();
  const delta = Math.max(0, now - before);

  pet.commits = now;
  evolve(pet, delta, todayCommits());
  save(pet);

  if (command === "status" || !command) show(pet);
  else if (command === "name") {
    pet.name = process.argv[3] || pet.name;
    save(pet);
    console.log(`🐾 Your pet is now ${pet.name}.`);
  } else if (command === "memory") {
    console.log(pet.memories.length ? pet.memories.map((x,i)=>`${i+1}. ${x}`).join("\n") : "No memories yet.");
  } else {
    console.log("repup | init [name] | status | name <name> | memory");
  }
}

main();
